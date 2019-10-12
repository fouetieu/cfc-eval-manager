import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { ReportingComponent } from 'app/entities/reporting/reporting.component';
import { ReportingService } from 'app/entities/reporting/reporting.service';
import { Reporting } from 'app/shared/model/reporting.model';

describe('Component Tests', () => {
  describe('Reporting Management Component', () => {
    let comp: ReportingComponent;
    let fixture: ComponentFixture<ReportingComponent>;
    let service: ReportingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [ReportingComponent],
        providers: []
      })
        .overrideTemplate(ReportingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReportingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReportingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Reporting(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.reportings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
