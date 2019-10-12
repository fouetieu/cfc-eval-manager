import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISessionEvaluation } from 'app/shared/model/session-evaluation.model';

@Component({
  selector: 'jhi-session-evaluation-detail',
  templateUrl: './session-evaluation-detail.component.html'
})
export class SessionEvaluationDetailComponent implements OnInit {
  sessionEvaluation: ISessionEvaluation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sessionEvaluation }) => {
      this.sessionEvaluation = sessionEvaluation;
    });
  }

  previousState() {
    window.history.back();
  }
}
