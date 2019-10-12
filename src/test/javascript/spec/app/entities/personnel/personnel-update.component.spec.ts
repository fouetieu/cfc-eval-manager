import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { PersonnelUpdateComponent } from 'app/entities/personnel/personnel-update.component';
import { PersonnelService } from 'app/entities/personnel/personnel.service';
import { Personnel } from 'app/shared/model/personnel.model';

describe('Component Tests', () => {
  describe('Personnel Management Update Component', () => {
    let comp: PersonnelUpdateComponent;
    let fixture: ComponentFixture<PersonnelUpdateComponent>;
    let service: PersonnelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [PersonnelUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PersonnelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonnelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonnelService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Personnel(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Personnel();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
