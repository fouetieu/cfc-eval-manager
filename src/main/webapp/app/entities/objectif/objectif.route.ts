import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Objectif } from 'app/shared/model/objectif.model';
import { ObjectifService } from './objectif.service';
import { ObjectifComponent } from './objectif.component';
import { ObjectifDetailComponent } from './objectif-detail.component';
import { ObjectifUpdateComponent } from './objectif-update.component';
import { ObjectifDeletePopupComponent } from './objectif-delete-dialog.component';
import { IObjectif } from 'app/shared/model/objectif.model';

@Injectable({ providedIn: 'root' })
export class ObjectifResolve implements Resolve<IObjectif> {
  constructor(private service: ObjectifService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IObjectif> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Objectif>) => response.ok),
        map((objectif: HttpResponse<Objectif>) => objectif.body)
      );
    }
    return of(new Objectif());
  }
}

export const objectifRoute: Routes = [
  {
    path: '',
    component: ObjectifComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.objectif.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ObjectifDetailComponent,
    resolve: {
      objectif: ObjectifResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.objectif.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ObjectifUpdateComponent,
    resolve: {
      objectif: ObjectifResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.objectif.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ObjectifUpdateComponent,
    resolve: {
      objectif: ObjectifResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.objectif.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const objectifPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ObjectifDeletePopupComponent,
    resolve: {
      objectif: ObjectifResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.objectif.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
