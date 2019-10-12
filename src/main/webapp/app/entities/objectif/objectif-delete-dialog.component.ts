import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IObjectif } from 'app/shared/model/objectif.model';
import { ObjectifService } from './objectif.service';

@Component({
  selector: 'jhi-objectif-delete-dialog',
  templateUrl: './objectif-delete-dialog.component.html'
})
export class ObjectifDeleteDialogComponent {
  objectif: IObjectif;

  constructor(protected objectifService: ObjectifService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.objectifService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'objectifListModification',
        content: 'Deleted an objectif'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-objectif-delete-popup',
  template: ''
})
export class ObjectifDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ objectif }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ObjectifDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.objectif = objectif;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/objectif', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/objectif', { outlets: { popup: null } }]);
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
