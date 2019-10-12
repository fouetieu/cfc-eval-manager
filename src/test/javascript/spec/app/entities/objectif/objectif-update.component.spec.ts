import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { ObjectifUpdateComponent } from 'app/entities/objectif/objectif-update.component';
import { ObjectifService } from 'app/entities/objectif/objectif.service';
import { Objectif } from 'app/shared/model/objectif.model';

describe('Component Tests', () => {
  describe('Objectif Management Update Component', () => {
    let comp: ObjectifUpdateComponent;
    let fixture: ComponentFixture<ObjectifUpdateComponent>;
    let service: ObjectifService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [ObjectifUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ObjectifUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ObjectifUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ObjectifService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Objectif(123);
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
        const entity = new Objectif();
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
