import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISessionEvaluation } from 'app/shared/model/session-evaluation.model';
import { SessionEvaluationService } from './session-evaluation.service';

@Component({
  selector: 'jhi-session-evaluation-delete-dialog',
  templateUrl: './session-evaluation-delete-dialog.component.html'
})
export class SessionEvaluationDeleteDialogComponent {
  sessionEvaluation: ISessionEvaluation;

  constructor(
    protected sessionEvaluationService: SessionEvaluationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sessionEvaluationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sessionEvaluationListModification',
        content: 'Deleted an sessionEvaluation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-session-evaluation-delete-popup',
  template: ''
})
export class SessionEvaluationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sessionEvaluation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SessionEvaluationDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sessionEvaluation = sessionEvaluation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/session-evaluation', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/session-evaluation', { outlets: { popup: null } }]);
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
