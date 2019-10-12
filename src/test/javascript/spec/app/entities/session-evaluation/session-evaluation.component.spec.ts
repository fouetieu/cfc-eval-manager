import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { SessionEvaluationComponent } from 'app/entities/session-evaluation/session-evaluation.component';
import { SessionEvaluationService } from 'app/entities/session-evaluation/session-evaluation.service';
import { SessionEvaluation } from 'app/shared/model/session-evaluation.model';

describe('Component Tests', () => {
  describe('SessionEvaluation Management Component', () => {
    let comp: SessionEvaluationComponent;
    let fixture: ComponentFixture<SessionEvaluationComponent>;
    let service: SessionEvaluationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [SessionEvaluationComponent],
        providers: []
      })
        .overrideTemplate(SessionEvaluationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SessionEvaluationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SessionEvaluationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SessionEvaluation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sessionEvaluations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
