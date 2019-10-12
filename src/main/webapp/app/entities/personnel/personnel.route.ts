import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Personnel } from 'app/shared/model/personnel.model';
import { PersonnelService } from './personnel.service';
import { PersonnelComponent } from './personnel.component';
import { PersonnelDetailComponent } from './personnel-detail.component';
import { PersonnelUpdateComponent } from './personnel-update.component';
import { PersonnelDeletePopupComponent } from './personnel-delete-dialog.component';
import { IPersonnel } from 'app/shared/model/personnel.model';

@Injectable({ providedIn: 'root' })
export class PersonnelResolve implements Resolve<IPersonnel> {
  constructor(private service: PersonnelService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPersonnel> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Personnel>) => response.ok),
        map((personnel: HttpResponse<Personnel>) => personnel.body)
      );
    }
    return of(new Personnel());
  }
}

export const personnelRoute: Routes = [
  {
    path: '',
    component: PersonnelComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.personnel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PersonnelDetailComponent,
    resolve: {
      personnel: PersonnelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.personnel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PersonnelUpdateComponent,
    resolve: {
      personnel: PersonnelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.personnel.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PersonnelUpdateComponent,
    resolve: {
      personnel: PersonnelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.personnel.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const personnelPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PersonnelDeletePopupComponent,
    resolve: {
      personnel: PersonnelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.personnel.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
