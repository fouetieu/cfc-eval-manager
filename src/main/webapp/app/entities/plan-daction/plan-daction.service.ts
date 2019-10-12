import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlanDaction } from 'app/shared/model/plan-daction.model';

type EntityResponseType = HttpResponse<IPlanDaction>;
type EntityArrayResponseType = HttpResponse<IPlanDaction[]>;

@Injectable({ providedIn: 'root' })
export class PlanDactionService {
  public resourceUrl = SERVER_API_URL + 'api/plan-dactions';

  constructor(protected http: HttpClient) {}

  create(planDaction: IPlanDaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planDaction);
    return this.http
      .post<IPlanDaction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(planDaction: IPlanDaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(planDaction);
    return this.http
      .put<IPlanDaction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlanDaction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlanDaction[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(planDaction: IPlanDaction): IPlanDaction {
    const copy: IPlanDaction = Object.assign({}, planDaction, {
      dateDebut: planDaction.dateDebut != null && planDaction.dateDebut.isValid() ? planDaction.dateDebut.toJSON() : null,
      dateFIn: planDaction.dateFIn != null && planDaction.dateFIn.isValid() ? planDaction.dateFIn.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut != null ? moment(res.body.dateDebut) : null;
      res.body.dateFIn = res.body.dateFIn != null ? moment(res.body.dateFIn) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((planDaction: IPlanDaction) => {
        planDaction.dateDebut = planDaction.dateDebut != null ? moment(planDaction.dateDebut) : null;
        planDaction.dateFIn = planDaction.dateFIn != null ? moment(planDaction.dateFIn) : null;
      });
    }
    return res;
  }
}
