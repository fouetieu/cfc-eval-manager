import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { PersonnelDetailComponent } from 'app/entities/personnel/personnel-detail.component';
import { Personnel } from 'app/shared/model/personnel.model';

describe('Component Tests', () => {
  describe('Personnel Management Detail Component', () => {
    let comp: PersonnelDetailComponent;
    let fixture: ComponentFixture<PersonnelDetailComponent>;
    const route = ({ data: of({ personnel: new Personnel(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [PersonnelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PersonnelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonnelDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.personnel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
