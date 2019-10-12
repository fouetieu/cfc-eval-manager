import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ISessionEvaluation, SessionEvaluation } from 'app/shared/model/session-evaluation.model';
import { SessionEvaluationService } from './session-evaluation.service';

@Component({
  selector: 'jhi-session-evaluation-update',
  templateUrl: './session-evaluation-update.component.html'
})
export class SessionEvaluationUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    dateDebut: [null, [Validators.required]],
    dateFin: [null, [Validators.required]],
    active: [null, [Validators.required]]
  });

  constructor(
    protected sessionEvaluationService: SessionEvaluationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sessionEvaluation }) => {
      this.updateForm(sessionEvaluation);
    });
  }

  updateForm(sessionEvaluation: ISessionEvaluation) {
    this.editForm.patchValue({
      id: sessionEvaluation.id,
      libelle: sessionEvaluation.libelle,
      dateDebut: sessionEvaluation.dateDebut != null ? sessionEvaluation.dateDebut.format(DATE_TIME_FORMAT) : null,
      dateFin: sessionEvaluation.dateFin != null ? sessionEvaluation.dateFin.format(DATE_TIME_FORMAT) : null,
      active: sessionEvaluation.active
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sessionEvaluation = this.createFromForm();
    if (sessionEvaluation.id !== undefined) {
      this.subscribeToSaveResponse(this.sessionEvaluationService.update(sessionEvaluation));
    } else {
      this.subscribeToSaveResponse(this.sessionEvaluationService.create(sessionEvaluation));
    }
  }

  private createFromForm(): ISessionEvaluation {
    return {
      ...new SessionEvaluation(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      dateDebut:
        this.editForm.get(['dateDebut']).value != null ? moment(this.editForm.get(['dateDebut']).value, DATE_TIME_FORMAT) : undefined,
      dateFin: this.editForm.get(['dateFin']).value != null ? moment(this.editForm.get(['dateFin']).value, DATE_TIME_FORMAT) : undefined,
      active: this.editForm.get(['active']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISessionEvaluation>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
