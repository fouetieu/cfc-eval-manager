import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { PersonnelDeleteDialogComponent } from 'app/entities/personnel/personnel-delete-dialog.component';
import { PersonnelService } from 'app/entities/personnel/personnel.service';

describe('Component Tests', () => {
  describe('Personnel Management Delete Component', () => {
    let comp: PersonnelDeleteDialogComponent;
    let fixture: ComponentFixture<PersonnelDeleteDialogComponent>;
    let service: PersonnelService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [PersonnelDeleteDialogComponent]
      })
        .overrideTemplate(PersonnelDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonnelDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonnelService);
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