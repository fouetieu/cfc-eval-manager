import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { ObjectifDetailComponent } from 'app/entities/objectif/objectif-detail.component';
import { Objectif } from 'app/shared/model/objectif.model';

describe('Component Tests', () => {
  describe('Objectif Management Detail Component', () => {
    let comp: ObjectifDetailComponent;
    let fixture: ComponentFixture<ObjectifDetailComponent>;
    const route = ({ data: of({ objectif: new Objectif(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [ObjectifDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ObjectifDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ObjectifDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.objectif).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
