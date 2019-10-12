import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { ReportingDeleteDialogComponent } from 'app/entities/reporting/reporting-delete-dialog.component';
import { ReportingService } from 'app/entities/reporting/reporting.service';

describe('Component Tests', () => {
  describe('Reporting Management Delete Component', () => {
    let comp: ReportingDeleteDialogComponent;
    let fixture: ComponentFixture<ReportingDeleteDialogComponent>;
    let service: ReportingService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [ReportingDeleteDialogComponent]
      })
        .overrideTemplate(ReportingDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReportingDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReportingService);
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
