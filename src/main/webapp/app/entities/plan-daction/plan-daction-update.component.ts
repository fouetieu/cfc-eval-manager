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
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IPlanDaction, PlanDaction } from 'app/shared/model/plan-daction.model';
import { PlanDactionService } from './plan-daction.service';
import { IObjectif } from 'app/shared/model/objectif.model';
import { ObjectifService } from 'app/entities/objectif/objectif.service';
import { IPersonnel } from 'app/shared/model/personnel.model';
import { PersonnelService } from 'app/entities/personnel/personnel.service';

@Component({
  selector: 'jhi-plan-daction-update',
  templateUrl: './plan-daction-update.component.html'
})
export class PlanDactionUpdateComponent implements OnInit {
  isSaving: boolean;

  objectifs: IObjectif[];

  personnels: IPersonnel[];

  editForm = this.fb.group({
    id: [],
    tache: [null, [Validators.required]],
    description: [],
    dateDebut: [],
    dateFIn: [],
    objectif: [null, Validators.required],
    personnel: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected planDactionService: PlanDactionService,
    protected objectifService: ObjectifService,
    protected personnelService: PersonnelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ planDaction }) => {
      this.updateForm(planDaction);
    });
    this.objectifService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IObjectif[]>) => mayBeOk.ok),
        map((response: HttpResponse<IObjectif[]>) => response.body)
      )
      .subscribe((res: IObjectif[]) => (this.objectifs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.personnelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPersonnel[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersonnel[]>) => response.body)
      )
      .subscribe((res: IPersonnel[]) => (this.personnels = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(planDaction: IPlanDaction) {
    this.editForm.patchValue({
      id: planDaction.id,
      tache: planDaction.tache,
      description: planDaction.description,
      dateDebut: planDaction.dateDebut != null ? planDaction.dateDebut.format(DATE_TIME_FORMAT) : null,
      dateFIn: planDaction.dateFIn != null ? planDaction.dateFIn.format(DATE_TIME_FORMAT) : null,
      objectif: planDaction.objectif,
      personnel: planDaction.personnel
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const planDaction = this.createFromForm();
    if (planDaction.id !== undefined) {
      this.subscribeToSaveResponse(this.planDactionService.update(planDaction));
    } else {
      this.subscribeToSaveResponse(this.planDactionService.create(planDaction));
    }
  }

  private createFromForm(): IPlanDaction {
    return {
      ...new PlanDaction(),
      id: this.editForm.get(['id']).value,
      tache: this.editForm.get(['tache']).value,
      description: this.editForm.get(['description']).value,
      dateDebut:
        this.editForm.get(['dateDebut']).value != null ? moment(this.editForm.get(['dateDebut']).value, DATE_TIME_FORMAT) : undefined,
      dateFIn: this.editForm.get(['dateFIn']).value != null ? moment(this.editForm.get(['dateFIn']).value, DATE_TIME_FORMAT) : undefined,
      objectif: this.editForm.get(['objectif']).value,
      personnel: this.editForm.get(['personnel']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanDaction>>) {
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

  trackPersonnelById(index: number, item: IPersonnel) {
    return item.id;
  }
}
