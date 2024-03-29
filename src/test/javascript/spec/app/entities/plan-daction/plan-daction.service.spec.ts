import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PlanDactionService } from 'app/entities/plan-daction/plan-daction.service';
import { IPlanDaction, PlanDaction } from 'app/shared/model/plan-daction.model';

describe('Service Tests', () => {
  describe('PlanDaction Service', () => {
    let injector: TestBed;
    let service: PlanDactionService;
    let httpMock: HttpTestingController;
    let elemDefault: IPlanDaction;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PlanDactionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PlanDaction(0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateDebut: currentDate.format(DATE_TIME_FORMAT),
            dateFIn: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a PlanDaction', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateDebut: currentDate.format(DATE_TIME_FORMAT),
            dateFIn: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateDebut: currentDate,
            dateFIn: currentDate
          },
          returnedFromService
        );
        service
          .create(new PlanDaction(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PlanDaction', () => {
        const returnedFromService = Object.assign(
          {
            tache: 'BBBBBB',
            description: 'BBBBBB',
            dateDebut: currentDate.format(DATE_TIME_FORMAT),
            dateFIn: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDebut: currentDate,
            dateFIn: currentDate
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

      it('should return a list of PlanDaction', () => {
        const returnedFromService = Object.assign(
          {
            tache: 'BBBBBB',
            description: 'BBBBBB',
            dateDebut: currentDate.format(DATE_TIME_FORMAT),
            dateFIn: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateDebut: currentDate,
            dateFIn: currentDate
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

      it('should delete a PlanDaction', () => {
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
