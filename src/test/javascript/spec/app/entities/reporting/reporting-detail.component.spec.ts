import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { ReportingDetailComponent } from 'app/entities/reporting/reporting-detail.component';
import { Reporting } from 'app/shared/model/reporting.model';

describe('Component Tests', () => {
  describe('Reporting Management Detail Component', () => {
    let comp: ReportingDetailComponent;
    let fixture: ComponentFixture<ReportingDetailComponent>;
    const route = ({ data: of({ reporting: new Reporting(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [ReportingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReportingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReportingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reporting).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
