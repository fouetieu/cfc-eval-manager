import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SessionEvaluation } from 'app/shared/model/session-evaluation.model';
import { SessionEvaluationService } from './session-evaluation.service';
import { SessionEvaluationComponent } from './session-evaluation.component';
import { SessionEvaluationDetailComponent } from './session-evaluation-detail.component';
import { SessionEvaluationUpdateComponent } from './session-evaluation-update.component';
import { SessionEvaluationDeletePopupComponent } from './session-evaluation-delete-dialog.component';
import { ISessionEvaluation } from 'app/shared/model/session-evaluation.model';

@Injectable({ providedIn: 'root' })
export class SessionEvaluationResolve implements Resolve<ISessionEvaluation> {
  constructor(private service: SessionEvaluationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISessionEvaluation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SessionEvaluation>) => response.ok),
        map((sessionEvaluation: HttpResponse<SessionEvaluation>) => sessionEvaluation.body)
      );
    }
    return of(new SessionEvaluation());
  }
}

export const sessionEvaluationRoute: Routes = [
  {
    path: '',
    component: SessionEvaluationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.sessionEvaluation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SessionEvaluationDetailComponent,
    resolve: {
      sessionEvaluation: SessionEvaluationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.sessionEvaluation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SessionEvaluationUpdateComponent,
    resolve: {
      sessionEvaluation: SessionEvaluationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.sessionEvaluation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SessionEvaluationUpdateComponent,
    resolve: {
      sessionEvaluation: SessionEvaluationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.sessionEvaluation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sessionEvaluationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SessionEvaluationDeletePopupComponent,
    resolve: {
      sessionEvaluation: SessionEvaluationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.sessionEvaluation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
