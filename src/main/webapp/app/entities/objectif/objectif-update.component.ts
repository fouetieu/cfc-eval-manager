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
import { IObjectif, Objectif } from 'app/shared/model/objectif.model';
import { ObjectifService } from './objectif.service';
import { IPersonnel } from 'app/shared/model/personnel.model';
import { PersonnelService } from 'app/entities/personnel/personnel.service';

@Component({
  selector: 'jhi-objectif-update',
  templateUrl: './objectif-update.component.html'
})
export class ObjectifUpdateComponent implements OnInit {
  isSaving: boolean;

  personnels: IPersonnel[];

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    livrable: [null, [Validators.required]],
    indicateur: [null, [Validators.required]],
    dateFin: [null, [Validators.required]],
    personnel: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected objectifService: ObjectifService,
    protected personnelService: PersonnelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ objectif }) => {
      this.updateForm(objectif);
    });
    this.personnelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPersonnel[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersonnel[]>) => response.body)
      )
      .subscribe((res: IPersonnel[]) => (this.personnels = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(objectif: IObjectif) {
    this.editForm.patchValue({
      id: objectif.id,
      libelle: objectif.libelle,
      livrable: objectif.livrable,
      indicateur: objectif.indicateur,
      dateFin: objectif.dateFin != null ? objectif.dateFin.format(DATE_TIME_FORMAT) : null,
      personnel: objectif.personnel
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
    const objectif = this.createFromForm();
    if (objectif.id !== undefined) {
      this.subscribeToSaveResponse(this.objectifService.update(objectif));
    } else {
      this.subscribeToSaveResponse(this.objectifService.create(objectif));
    }
  }

  private createFromForm(): IObjectif {
    return {
      ...new Objectif(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      livrable: this.editForm.get(['livrable']).value,
      indicateur: this.editForm.get(['indicateur']).value,
      dateFin: this.editForm.get(['dateFin']).value != null ? moment(this.editForm.get(['dateFin']).value, DATE_TIME_FORMAT) : undefined,
      personnel: this.editForm.get(['personnel']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IObjectif>>) {
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

  trackPersonnelById(index: number, item: IPersonnel) {
    return item.id;
  }
}
