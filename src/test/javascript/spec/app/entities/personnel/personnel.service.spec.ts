import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PersonnelService } from 'app/entities/personnel/personnel.service';
import { IPersonnel, Personnel } from 'app/shared/model/personnel.model';

describe('Service Tests', () => {
  describe('Personnel Service', () => {
    let injector: TestBed;
    let service: PersonnelService;
    let httpMock: HttpTestingController;
    let elemDefault: IPersonnel;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PersonnelService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Personnel(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateNaiss: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Personnel', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateNaiss: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateNaiss: currentDate
          },
          returnedFromService
        );
        service
          .create(new Personnel(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Personnel', () => {
        const returnedFromService = Object.assign(
          {
            matricule: 'BBBBBB',
            nom: 'BBBBBB',
            poste: 'BBBBBB',
            dateNaiss: currentDate.format(DATE_TIME_FORMAT),
            sexe: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaiss: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Personnel', () => {
        const returnedFromService = Object.assign(
          {
            matricule: 'BBBBBB',
            nom: 'BBBBBB',
            poste: 'BBBBBB',
            dateNaiss: currentDate.format(DATE_TIME_FORMAT),
            sexe: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateNaiss: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Personnel', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
