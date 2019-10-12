import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SessionEvaluationService } from 'app/entities/session-evaluation/session-evaluation.service';
import { ISessionEvaluation, SessionEvaluation } from 'app/shared/model/session-evaluation.model';

describe('Service Tests', () => {
  describe('SessionEvaluation Service', () => {
    let injector: TestBed;
    let service: SessionEvaluationService;
    let httpMock: HttpTestingController;
    let elemDefault: ISessionEvaluation;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(SessionEvaluationService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new SessionEvaluation(0, 'AAAAAAA', currentDate, currentDate, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateDebut: currentDate.format(DATE_TIME_FORMAT),
            dateFin: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a SessionEvaluation', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateDebut: currentDate.format(DATE_TIME_FORMAT),
            dateFin: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateDebut: currentDate,
            dateFin: currentDate
          },
          returnedFromService
        );
        service
          .create(new SessionEvaluation(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a SessionEvaluation', () => {
        const returnedFromService = Object.assign(
          {
            libelle: 'BBBBBB',
            dateDebut: currentDate.format(DATE_TIME_FORMAT),
            dateFin: currentDate.format(DATE_TIME_FORMAT),
            active: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDebut: currentDate,
            dateFin: currentDate
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

      it('should return a list of SessionEvaluation', () => {
        const returnedFromService = Object.assign(
          {
            libelle: 'BBBBBB',
            dateDebut: currentDate.format(DATE_TIME_FORMAT),
            dateFin: currentDate.format(DATE_TIME_FORMAT),
            active: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateDebut: currentDate,
            dateFin: currentDate
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

      it('should delete a SessionEvaluation', () => {
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
