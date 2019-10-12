import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { SessionEvaluationUpdateComponent } from 'app/entities/session-evaluation/session-evaluation-update.component';
import { SessionEvaluationService } from 'app/entities/session-evaluation/session-evaluation.service';
import { SessionEvaluation } from 'app/shared/model/session-evaluation.model';

describe('Component Tests', () => {
  describe('SessionEvaluation Management Update Component', () => {
    let comp: SessionEvaluationUpdateComponent;
    let fixture: ComponentFixture<SessionEvaluationUpdateComponent>;
    let service: SessionEvaluationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [SessionEvaluationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SessionEvaluationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SessionEvaluationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SessionEvaluationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SessionEvaluation(123);
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
        const entity = new SessionEvaluation();
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
