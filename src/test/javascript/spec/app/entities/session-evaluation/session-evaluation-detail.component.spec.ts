import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { SessionEvaluationDetailComponent } from 'app/entities/session-evaluation/session-evaluation-detail.component';
import { SessionEvaluation } from 'app/shared/model/session-evaluation.model';

describe('Component Tests', () => {
  describe('SessionEvaluation Management Detail Component', () => {
    let comp: SessionEvaluationDetailComponent;
    let fixture: ComponentFixture<SessionEvaluationDetailComponent>;
    const route = ({ data: of({ sessionEvaluation: new SessionEvaluation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [SessionEvaluationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SessionEvaluationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SessionEvaluationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sessionEvaluation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
