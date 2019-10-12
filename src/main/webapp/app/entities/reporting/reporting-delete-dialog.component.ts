import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReporting } from 'app/shared/model/reporting.model';
import { ReportingService } from './reporting.service';

@Component({
  selector: 'jhi-reporting-delete-dialog',
  templateUrl: './reporting-delete-dialog.component.html'
})
export class ReportingDeleteDialogComponent {
  reporting: IReporting;

  constructor(protected reportingService: ReportingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.reportingService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'reportingListModification',
        content: 'Deleted an reporting'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-reporting-delete-popup',
  template: ''
})
export class ReportingDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reporting }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ReportingDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.reporting = reporting;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/reporting', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/reporting', { outlets: { popup: null } }]);
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
