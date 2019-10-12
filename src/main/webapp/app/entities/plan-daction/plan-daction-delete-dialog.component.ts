import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlanDaction } from 'app/shared/model/plan-daction.model';
import { PlanDactionService } from './plan-daction.service';

@Component({
  selector: 'jhi-plan-daction-delete-dialog',
  templateUrl: './plan-daction-delete-dialog.component.html'
})
export class PlanDactionDeleteDialogComponent {
  planDaction: IPlanDaction;

  constructor(
    protected planDactionService: PlanDactionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.planDactionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'planDactionListModification',
        content: 'Deleted an planDaction'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-plan-daction-delete-popup',
  template: ''
})
export class PlanDactionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ planDaction }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlanDactionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.planDaction = planDaction;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/plan-daction', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/plan-daction', { outlets: { popup: null } }]);
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
