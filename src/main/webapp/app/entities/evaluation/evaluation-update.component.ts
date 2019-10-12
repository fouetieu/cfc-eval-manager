import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IEvaluation, Evaluation } from 'app/shared/model/evaluation.model';
import { EvaluationService } from './evaluation.service';
import { IObjectif } from 'app/shared/model/objectif.model';
import { ObjectifService } from 'app/entities/objectif/objectif.service';
import { ISessionEvaluation } from 'app/shared/model/session-evaluation.model';
import { SessionEvaluationService } from 'app/entities/session-evaluation/session-evaluation.service';
import { IPersonnel } from 'app/shared/model/personnel.model';
import { PersonnelService } from 'app/entities/personnel/personnel.service';

@Component({
  selector: 'jhi-evaluation-update',
  templateUrl: './evaluation-update.component.html'
})
export class EvaluationUpdateComponent implements OnInit {
  isSaving: boolean;

  objectifs: IObjectif[];

  sessionevaluations: ISessionEvaluation[];

  personnels: IPersonnel[];

  editForm = this.fb.group({
    id: [],
    dateEvaluation: [null, [Validators.required]],
    note: [null, [Validators.required]],
    objectif: [null, Validators.required],
    session: [null, Validators.required],
    personnel: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected evaluationService: EvaluationService,
    protected objectifService: ObjectifService,
    protected sessionEvaluationService: SessionEvaluationService,
    protected personnelService: PersonnelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ evaluation }) => {
      this.updateForm(evaluation);
    });
    this.objectifService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IObjectif[]>) => mayBeOk.ok),
        map((response: HttpResponse<IObjectif[]>) => response.body)
      )
      .subscribe((res: IObjectif[]) => (this.objectifs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.sessionEvaluationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISessionEvaluation[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISessionEvaluation[]>) => response.body)
      )
      .subscribe((res: ISessionEvaluation[]) => (this.sessionevaluations = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.personnelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPersonnel[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersonnel[]>) => response.body)
      )
      .subscribe((res: IPersonnel[]) => (this.personnels = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(evaluation: IEvaluation) {
    this.editForm.patchValue({
      id: evaluation.id,
      dateEvaluation: evaluation.dateEvaluation != null ? evaluation.dateEvaluation.format(DATE_TIME_FORMAT) : null,
      note: evaluation.note,
      objectif: evaluation.objectif,
      session: evaluation.session,
      personnel: evaluation.personnel
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const evaluation = this.createFromForm();
    if (evaluation.id !== undefined) {
      this.subscribeToSaveResponse(this.evaluationService.update(evaluation));
    } else {
      this.subscribeToSaveResponse(this.evaluationService.create(evaluation));
    }
  }

  private createFromForm(): IEvaluation {
    return {
      ...new Evaluation(),
      id: this.editForm.get(['id']).value,
      dateEvaluation:
        this.editForm.get(['dateEvaluation']).value != null
          ? moment(this.editForm.get(['dateEvaluation']).value, DATE_TIME_FORMAT)
          : undefined,
      note: this.editForm.get(['note']).value,
      objectif: this.editForm.get(['objectif']).value,
      session: this.editForm.get(['session']).value,
      personnel: this.editForm.get(['personnel']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvaluation>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackObjectifById(index: number, item: IObjectif) {
    return item.id;
  }

  trackSessionEvaluationById(index: number, item: ISessionEvaluation) {
    return item.id;
  }

  trackPersonnelById(index: number, item: IPersonnel) {
    return item.id;
  }
}
