import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { PersonnelComponent } from 'app/entities/personnel/personnel.component';
import { PersonnelService } from 'app/entities/personnel/personnel.service';
import { Personnel } from 'app/shared/model/personnel.model';

describe('Component Tests', () => {
  describe('Personnel Management Component', () => {
    let comp: PersonnelComponent;
    let fixture: ComponentFixture<PersonnelComponent>;
    let service: PersonnelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [PersonnelComponent],
        providers: []
      })
        .overrideTemplate(PersonnelComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonnelComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonnelService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Personnel(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.personnels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
