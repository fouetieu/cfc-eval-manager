import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { PlanDactionUpdateComponent } from 'app/entities/plan-daction/plan-daction-update.component';
import { PlanDactionService } from 'app/entities/plan-daction/plan-daction.service';
import { PlanDaction } from 'app/shared/model/plan-daction.model';

describe('Component Tests', () => {
  describe('PlanDaction Management Update Component', () => {
    let comp: PlanDactionUpdateComponent;
    let fixture: ComponentFixture<PlanDactionUpdateComponent>;
    let service: PlanDactionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [PlanDactionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlanDactionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlanDactionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlanDactionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlanDaction(123);
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
        const entity = new PlanDaction();
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
