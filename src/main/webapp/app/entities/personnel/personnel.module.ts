import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CfcEvalManagerSharedModule } from 'app/shared/shared.module';
import { PersonnelComponent } from './personnel.component';
import { PersonnelDetailComponent } from './personnel-detail.component';
import { PersonnelUpdateComponent } from './personnel-update.component';
import { PersonnelDeletePopupComponent, PersonnelDeleteDialogComponent } from './personnel-delete-dialog.component';
import { personnelRoute, personnelPopupRoute } from './personnel.route';

const ENTITY_STATES = [...personnelRoute, ...personnelPopupRoute];

@NgModule({
  imports: [CfcEvalManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PersonnelComponent,
    PersonnelDetailComponent,
    PersonnelUpdateComponent,
    PersonnelDeleteDialogComponent,
    PersonnelDeletePopupComponent
  ],
  entryComponents: [PersonnelDeleteDialogComponent]
})
export class CfcEvalManagerPersonnelModule {}
