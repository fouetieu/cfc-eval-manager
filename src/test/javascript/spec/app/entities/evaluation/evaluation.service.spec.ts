import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EvaluationService } from 'app/entities/evaluation/evaluation.service';
import { IEvaluation, Evaluation } from 'app/shared/model/evaluation.model';

describe('Service Tests', () => {
  describe('Evaluation Service', () => {
    let injector: TestBed;
    let service: EvaluationService;
    let httpMock: HttpTestingController;
    let elemDefault: IEvaluation;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(EvaluationService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Evaluation(0, currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateEvaluation: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a Evaluation', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateEvaluation: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateEvaluation: currentDate
          },
          returnedFromService
        );
        service
          .create(new Evaluation(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Evaluation', () => {
        const returnedFromService = Object.assign(
          {
            dateEvaluation: currentDate.format(DATE_TIME_FORMAT),
            note: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEvaluation: currentDate
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

      it('should return a list of Evaluation', () => {
        const returnedFromService = Object.assign(
          {
            dateEvaluation: currentDate.format(DATE_TIME_FORMAT),
            note: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateEvaluation: currentDate
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

      it('should delete a Evaluation', () => {
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
