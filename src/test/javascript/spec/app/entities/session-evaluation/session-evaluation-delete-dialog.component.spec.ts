import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { SessionEvaluationDeleteDialogComponent } from 'app/entities/session-evaluation/session-evaluation-delete-dialog.component';
import { SessionEvaluationService } from 'app/entities/session-evaluation/session-evaluation.service';

describe('Component Tests', () => {
  describe('SessionEvaluation Management Delete Component', () => {
    let comp: SessionEvaluationDeleteDialogComponent;
    let fixture: ComponentFixture<SessionEvaluationDeleteDialogComponent>;
    let service: SessionEvaluationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [SessionEvaluationDeleteDialogComponent]
      })
        .overrideTemplate(SessionEvaluationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SessionEvaluationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SessionEvaluationService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
