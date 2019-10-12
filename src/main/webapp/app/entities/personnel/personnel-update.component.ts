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
import { IPersonnel, Personnel } from 'app/shared/model/personnel.model';
import { PersonnelService } from './personnel.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-personnel-update',
  templateUrl: './personnel-update.component.html'
})
export class PersonnelUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    matricule: [null, [Validators.required]],
    nom: [null, [Validators.required]],
    poste: [],
    dateNaiss: [],
    sexe: [],
    utilisateur: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected personnelService: PersonnelService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ personnel }) => {
      this.updateForm(personnel);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(personnel: IPersonnel) {
    this.editForm.patchValue({
      id: personnel.id,
      matricule: personnel.matricule,
      nom: personnel.nom,
      poste: personnel.poste,
      dateNaiss: personnel.dateNaiss != null ? personnel.dateNaiss.format(DATE_TIME_FORMAT) : null,
      sexe: personnel.sexe,
      utilisateur: personnel.utilisateur
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const personnel = this.createFromForm();
    if (personnel.id !== undefined) {
      this.subscribeToSaveResponse(this.personnelService.update(personnel));
    } else {
      this.subscribeToSaveResponse(this.personnelService.create(personnel));
    }
  }

  private createFromForm(): IPersonnel {
    return {
      ...new Personnel(),
      id: this.editForm.get(['id']).value,
      matricule: this.editForm.get(['matricule']).value,
      nom: this.editForm.get(['nom']).value,
      poste: this.editForm.get(['poste']).value,
      dateNaiss:
        this.editForm.get(['dateNaiss']).value != null ? moment(this.editForm.get(['dateNaiss']).value, DATE_TIME_FORMAT) : undefined,
      sexe: this.editForm.get(['sexe']).value,
      utilisateur: this.editForm.get(['utilisateur']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonnel>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
