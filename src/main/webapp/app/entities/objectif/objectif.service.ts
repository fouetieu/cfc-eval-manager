import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IObjectif } from 'app/shared/model/objectif.model';

type EntityResponseType = HttpResponse<IObjectif>;
type EntityArrayResponseType = HttpResponse<IObjectif[]>;

@Injectable({ providedIn: 'root' })
export class ObjectifService {
  public resourceUrl = SERVER_API_URL + 'api/objectifs';

  constructor(protected http: HttpClient) {}

  create(objectif: IObjectif): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(objectif);
    return this.http
      .post<IObjectif>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(objectif: IObjectif): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(objectif);
    return this.http
      .put<IObjectif>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IObjectif>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IObjectif[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(objectif: IObjectif): IObjectif {
    const copy: IObjectif = Object.assign({}, objectif, {
      dateFin: objectif.dateFin != null && objectif.dateFin.isValid() ? objectif.dateFin.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateFin = res.body.dateFin != null ? moment(res.body.dateFin) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((objectif: IObjectif) => {
        objectif.dateFin = objectif.dateFin != null ? moment(objectif.dateFin) : null;
      });
    }
    return res;
  }
}
