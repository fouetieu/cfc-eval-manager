import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CfcEvalManagerSharedModule } from 'app/shared/shared.module';
import { EvaluationComponent } from './evaluation.component';
import { EvaluationDetailComponent } from './evaluation-detail.component';
import { EvaluationUpdateComponent } from './evaluation-update.component';
import { EvaluationDeletePopupComponent, EvaluationDeleteDialogComponent } from './evaluation-delete-dialog.component';
import { evaluationRoute, evaluationPopupRoute } from './evaluation.route';

const ENTITY_STATES = [...evaluationRoute, ...evaluationPopupRoute];

@NgModule({
  imports: [CfcEvalManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EvaluationComponent,
    EvaluationDetailComponent,
    EvaluationUpdateComponent,
    EvaluationDeleteDialogComponent,
    EvaluationDeletePopupComponent
  ],
  entryComponents: [EvaluationDeleteDialogComponent]
})
export class CfcEvalManagerEvaluationModule {}
