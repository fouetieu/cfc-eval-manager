import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { PlanDactionComponent } from 'app/entities/plan-daction/plan-daction.component';
import { PlanDactionService } from 'app/entities/plan-daction/plan-daction.service';
import { PlanDaction } from 'app/shared/model/plan-daction.model';

describe('Component Tests', () => {
  describe('PlanDaction Management Component', () => {
    let comp: PlanDactionComponent;
    let fixture: ComponentFixture<PlanDactionComponent>;
    let service: PlanDactionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [PlanDactionComponent],
        providers: []
      })
        .overrideTemplate(PlanDactionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlanDactionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlanDactionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PlanDaction(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.planDactions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
