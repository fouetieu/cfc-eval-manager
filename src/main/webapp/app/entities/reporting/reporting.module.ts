import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CfcEvalManagerSharedModule } from 'app/shared/shared.module';
import { ReportingComponent } from './reporting.component';
import { ReportingDetailComponent } from './reporting-detail.component';
import { ReportingUpdateComponent } from './reporting-update.component';
import { ReportingDeletePopupComponent, ReportingDeleteDialogComponent } from './reporting-delete-dialog.component';
import { reportingRoute, reportingPopupRoute } from './reporting.route';

const ENTITY_STATES = [...reportingRoute, ...reportingPopupRoute];

@NgModule({
  imports: [CfcEvalManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReportingComponent,
    ReportingDetailComponent,
    ReportingUpdateComponent,
    ReportingDeleteDialogComponent,
    ReportingDeletePopupComponent
  ],
  entryComponents: [ReportingDeleteDialogComponent]
})
export class CfcEvalManagerReportingModule {}
