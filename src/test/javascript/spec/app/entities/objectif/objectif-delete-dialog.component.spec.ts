import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { ObjectifDeleteDialogComponent } from 'app/entities/objectif/objectif-delete-dialog.component';
import { ObjectifService } from 'app/entities/objectif/objectif.service';

describe('Component Tests', () => {
  describe('Objectif Management Delete Component', () => {
    let comp: ObjectifDeleteDialogComponent;
    let fixture: ComponentFixture<ObjectifDeleteDialogComponent>;
    let service: ObjectifService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [ObjectifDeleteDialogComponent]
      })
        .overrideTemplate(ObjectifDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ObjectifDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ObjectifService);
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
