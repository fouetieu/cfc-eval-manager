import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'personnel',
        loadChildren: () => import('./personnel/personnel.module').then(m => m.CfcEvalManagerPersonnelModule)
      },
      {
        path: 'objectif',
        loadChildren: () => import('./objectif/objectif.module').then(m => m.CfcEvalManagerObjectifModule)
      },
      {
        path: 'session-evaluation',
        loadChildren: () => import('./session-evaluation/session-evaluation.module').then(m => m.CfcEvalManagerSessionEvaluationModule)
      },
      {
        path: 'evaluation',
        loadChildren: () => import('./evaluation/evaluation.module').then(m => m.CfcEvalManagerEvaluationModule)
      },
      {
        path: 'plan-daction',
        loadChildren: () => import('./plan-daction/plan-daction.module').then(m => m.CfcEvalManagerPlanDactionModule)
      },
      {
        path: 'reporting',
        loadChildren: () => import('./reporting/reporting.module').then(m => m.CfcEvalManagerReportingModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CfcEvalManagerEntityModule {}
