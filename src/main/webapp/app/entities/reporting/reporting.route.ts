import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Reporting } from 'app/shared/model/reporting.model';
import { ReportingService } from './reporting.service';
import { ReportingComponent } from './reporting.component';
import { ReportingDetailComponent } from './reporting-detail.component';
import { ReportingUpdateComponent } from './reporting-update.component';
import { ReportingDeletePopupComponent } from './reporting-delete-dialog.component';
import { IReporting } from 'app/shared/model/reporting.model';

@Injectable({ providedIn: 'root' })
export class ReportingResolve implements Resolve<IReporting> {
  constructor(private service: ReportingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReporting> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Reporting>) => response.ok),
        map((reporting: HttpResponse<Reporting>) => reporting.body)
      );
    }
    return of(new Reporting());
  }
}

export const reportingRoute: Routes = [
  {
    path: '',
    component: ReportingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.reporting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReportingDetailComponent,
    resolve: {
      reporting: ReportingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.reporting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReportingUpdateComponent,
    resolve: {
      reporting: ReportingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.reporting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReportingUpdateComponent,
    resolve: {
      reporting: ReportingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.reporting.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const reportingPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ReportingDeletePopupComponent,
    resolve: {
      reporting: ReportingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cfcEvalManagerApp.reporting.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
