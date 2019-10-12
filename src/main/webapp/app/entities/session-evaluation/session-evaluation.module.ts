import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CfcEvalManagerSharedModule } from 'app/shared/shared.module';
import { SessionEvaluationComponent } from './session-evaluation.component';
import { SessionEvaluationDetailComponent } from './session-evaluation-detail.component';
import { SessionEvaluationUpdateComponent } from './session-evaluation-update.component';
import {
  SessionEvaluationDeletePopupComponent,
  SessionEvaluationDeleteDialogComponent
} from './session-evaluation-delete-dialog.component';
import { sessionEvaluationRoute, sessionEvaluationPopupRoute } from './session-evaluation.route';

const ENTITY_STATES = [...sessionEvaluationRoute, ...sessionEvaluationPopupRoute];

@NgModule({
  imports: [CfcEvalManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SessionEvaluationComponent,
    SessionEvaluationDetailComponent,
    SessionEvaluationUpdateComponent,
    SessionEvaluationDeleteDialogComponent,
    SessionEvaluationDeletePopupComponent
  ],
  entryComponents: [SessionEvaluationDeleteDialogComponent]
})
export class CfcEvalManagerSessionEvaluationModule {}
