import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CfcEvalManagerSharedModule } from 'app/shared/shared.module';
import { PlanDactionComponent } from './plan-daction.component';
import { PlanDactionDetailComponent } from './plan-daction-detail.component';
import { PlanDactionUpdateComponent } from './plan-daction-update.component';
import { PlanDactionDeletePopupComponent, PlanDactionDeleteDialogComponent } from './plan-daction-delete-dialog.component';
import { planDactionRoute, planDactionPopupRoute } from './plan-daction.route';

const ENTITY_STATES = [...planDactionRoute, ...planDactionPopupRoute];

@NgModule({
  imports: [CfcEvalManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlanDactionComponent,
    PlanDactionDetailComponent,
    PlanDactionUpdateComponent,
    PlanDactionDeleteDialogComponent,
    PlanDactionDeletePopupComponent
  ],
  entryComponents: [PlanDactionDeleteDialogComponent]
})
export class CfcEvalManagerPlanDactionModule {}
