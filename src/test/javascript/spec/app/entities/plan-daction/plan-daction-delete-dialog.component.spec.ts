import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { PlanDactionDeleteDialogComponent } from 'app/entities/plan-daction/plan-daction-delete-dialog.component';
import { PlanDactionService } from 'app/entities/plan-daction/plan-daction.service';

describe('Component Tests', () => {
  describe('PlanDaction Management Delete Component', () => {
    let comp: PlanDactionDeleteDialogComponent;
    let fixture: ComponentFixture<PlanDactionDeleteDialogComponent>;
    let service: PlanDactionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [PlanDactionDeleteDialogComponent]
      })
        .overrideTemplate(PlanDactionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlanDactionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlanDactionService);
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
