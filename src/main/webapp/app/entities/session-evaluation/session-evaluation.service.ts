import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISessionEvaluation } from 'app/shared/model/session-evaluation.model';

type EntityResponseType = HttpResponse<ISessionEvaluation>;
type EntityArrayResponseType = HttpResponse<ISessionEvaluation[]>;

@Injectable({ providedIn: 'root' })
export class SessionEvaluationService {
  public resourceUrl = SERVER_API_URL + 'api/session-evaluations';

  constructor(protected http: HttpClient) {}

  create(sessionEvaluation: ISessionEvaluation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sessionEvaluation);
    return this.http
      .post<ISessionEvaluation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sessionEvaluation: ISessionEvaluation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sessionEvaluation);
    return this.http
      .put<ISessionEvaluation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISessionEvaluation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISessionEvaluation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(sessionEvaluation: ISessionEvaluation): ISessionEvaluation {
    const copy: ISessionEvaluation = Object.assign({}, sessionEvaluation, {
      dateDebut: sessionEvaluation.dateDebut != null && sessionEvaluation.dateDebut.isValid() ? sessionEvaluation.dateDebut.toJSON() : null,
      dateFin: sessionEvaluation.dateFin != null && sessionEvaluation.dateFin.isValid() ? sessionEvaluation.dateFin.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut != null ? moment(res.body.dateDebut) : null;
      res.body.dateFin = res.body.dateFin != null ? moment(res.body.dateFin) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((sessionEvaluation: ISessionEvaluation) => {
        sessionEvaluation.dateDebut = sessionEvaluation.dateDebut != null ? moment(sessionEvaluation.dateDebut) : null;
        sessionEvaluation.dateFin = sessionEvaluation.dateFin != null ? moment(sessionEvaluation.dateFin) : null;
      });
    }
    return res;
  }
}
