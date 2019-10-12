import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IReporting, Reporting } from 'app/shared/model/reporting.model';
import { ReportingService } from './reporting.service';
import { IObjectif } from 'app/shared/model/objectif.model';
import { ObjectifService } from 'app/entities/objectif/objectif.service';
import { IPersonnel } from 'app/shared/model/personnel.model';
import { PersonnelService } from 'app/entities/personnel/personnel.service';

@Component({
  selector: 'jhi-reporting-update',
  templateUrl: './reporting-update.component.html'
})
export class ReportingUpdateComponent implements OnInit {
  isSaving: boolean;

  objectifs: IObjectif[];

  personnels: IPersonnel[];

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    description: [null, [Validators.required]],
    document: [],
    documentContentType: [],
    objectif: [null, Validators.required],
    personnel: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected reportingService: ReportingService,
    protected objectifService: ObjectifService,
    protected personnelService: PersonnelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reporting }) => {
      this.updateForm(reporting);
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

  updateForm(reporting: IReporting) {
    this.editForm.patchValue({
      id: reporting.id,
      libelle: reporting.libelle,
      description: reporting.description,
      document: reporting.document,
      documentContentType: reporting.documentContentType,
      objectif: reporting.objectif,
      personnel: reporting.personnel
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
    const reporting = this.createFromForm();
    if (reporting.id !== undefined) {
      this.subscribeToSaveResponse(this.reportingService.update(reporting));
    } else {
      this.subscribeToSaveResponse(this.reportingService.create(reporting));
    }
  }

  private createFromForm(): IReporting {
    return {
      ...new Reporting(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      description: this.editForm.get(['description']).value,
      documentContentType: this.editForm.get(['documentContentType']).value,
      document: this.editForm.get(['document']).value,
      objectif: this.editForm.get(['objectif']).value,
      personnel: this.editForm.get(['personnel']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReporting>>) {
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
