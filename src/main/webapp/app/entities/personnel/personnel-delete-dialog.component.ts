import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonnel } from 'app/shared/model/personnel.model';
import { PersonnelService } from './personnel.service';

@Component({
  selector: 'jhi-personnel-delete-dialog',
  templateUrl: './personnel-delete-dialog.component.html'
})
export class PersonnelDeleteDialogComponent {
  personnel: IPersonnel;

  constructor(protected personnelService: PersonnelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.personnelService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'personnelListModification',
        content: 'Deleted an personnel'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-personnel-delete-popup',
  template: ''
})
export class PersonnelDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ personnel }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PersonnelDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.personnel = personnel;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/personnel', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/personnel', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
