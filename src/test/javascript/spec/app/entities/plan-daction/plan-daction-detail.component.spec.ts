import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { PlanDactionDetailComponent } from 'app/entities/plan-daction/plan-daction-detail.component';
import { PlanDaction } from 'app/shared/model/plan-daction.model';

describe('Component Tests', () => {
  describe('PlanDaction Management Detail Component', () => {
    let comp: PlanDactionDetailComponent;
    let fixture: ComponentFixture<PlanDactionDetailComponent>;
    const route = ({ data: of({ planDaction: new PlanDaction(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [PlanDactionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlanDactionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlanDactionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.planDaction).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
