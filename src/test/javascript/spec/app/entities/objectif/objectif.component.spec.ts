import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CfcEvalManagerTestModule } from '../../../test.module';
import { ObjectifComponent } from 'app/entities/objectif/objectif.component';
import { ObjectifService } from 'app/entities/objectif/objectif.service';
import { Objectif } from 'app/shared/model/objectif.model';

describe('Component Tests', () => {
  describe('Objectif Management Component', () => {
    let comp: ObjectifComponent;
    let fixture: ComponentFixture<ObjectifComponent>;
    let service: ObjectifService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CfcEvalManagerTestModule],
        declarations: [ObjectifComponent],
        providers: []
      })
        .overrideTemplate(ObjectifComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ObjectifComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ObjectifService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Objectif(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.objectifs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
