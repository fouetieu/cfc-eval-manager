import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlanDaction } from 'app/shared/model/plan-daction.model';
import { PlanDactionService } from './plan-daction.service';
import { PlanDactionComponent } from './plan-daction.component';
import { PlanDactionDetailComponent } from './plan-daction-detail.component';
import { PlanDactionUpdateComponent } from './plan-daction-update.component';
import { PlanDactionDeletePopupComponent } from './plan-daction-delete-dialog.component';
import { IPlanDaction } from 'app/shared/model/plan-daction.model';

@Injectable({ providedIn: 'root' })
export class PlanDactionResolve implements Resolve<IPlanDaction> {
  constructor(private service: PlanDactionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlanDaction> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlanDaction>) => response.ok),
        map((planDaction: HttpResponse<PlanDaction>) => planDaction.body)
      );
    }
    return of(new PlanDaction());
  }
}

export const planDactionRoute: Routes = [
  {
    path: '',
    component: PlanDactionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.planDaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlanDactionDetailComponent,
    resolve: {
      planDaction: PlanDactionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.planDaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlanDactionUpdateComponent,
    resolve: {
      planDaction: PlanDactionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.planDaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlanDactionUpdateComponent,
    resolve: {
      planDaction: PlanDactionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.planDaction.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const planDactionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlanDactionDeletePopupComponent,
    resolve: {
      planDaction: PlanDactionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.planDaction.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
