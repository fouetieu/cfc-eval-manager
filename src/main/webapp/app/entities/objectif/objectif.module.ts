import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CfcEvalManagerSharedModule } from 'app/shared/shared.module';
import { ObjectifComponent } from './objectif.component';
import { ObjectifDetailComponent } from './objectif-detail.component';
import { ObjectifUpdateComponent } from './objectif-update.component';
import { ObjectifDeletePopupComponent, ObjectifDeleteDialogComponent } from './objectif-delete-dialog.component';
import { objectifRoute, objectifPopupRoute } from './objectif.route';

const ENTITY_STATES = [...objectifRoute, ...objectifPopupRoute];

@NgModule({
  imports: [CfcEvalManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ObjectifComponent,
    ObjectifDetailComponent,
    ObjectifUpdateComponent,
    ObjectifDeleteDialogComponent,
    ObjectifDeletePopupComponent
  ],
  entryComponents: [ObjectifDeleteDialogComponent]
})
export class CfcEvalManagerObjectifModule {}
