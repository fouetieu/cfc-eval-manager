import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { ReportingUpdateComponent } from 'app/entities/reporting/reporting-update.component';
import { ReportingService } from 'app/entities/reporting/reporting.service';
import { Reporting } from 'app/shared/model/reporting.model';

describe('Component Tests', () => {
  describe('Reporting Management Update Component', () => {
    let comp: ReportingUpdateComponent;
    let fixture: ComponentFixture<ReportingUpdateComponent>;
    let service: ReportingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [ReportingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ReportingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReportingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReportingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Reporting(123);
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
        const entity = new Reporting();
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
