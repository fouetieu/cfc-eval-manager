import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPersonnel } from 'app/shared/model/personnel.model';

type EntityResponseType = HttpResponse<IPersonnel>;
type EntityArrayResponseType = HttpResponse<IPersonnel[]>;

@Injectable({ providedIn: 'root' })
export class PersonnelService {
  public resourceUrl = SERVER_API_URL + 'api/personnels';

  constructor(protected http: HttpClient) {}

  create(personnel: IPersonnel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personnel);
    return this.http
      .post<IPersonnel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(personnel: IPersonnel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personnel);
    return this.http
      .put<IPersonnel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPersonnel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPersonnel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(personnel: IPersonnel): IPersonnel {
    const copy: IPersonnel = Object.assign({}, personnel, {
      dateNaiss: personnel.dateNaiss != null && personnel.dateNaiss.isValid() ? personnel.dateNaiss.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateNaiss = res.body.dateNaiss != null ? moment(res.body.dateNaiss) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((personnel: IPersonnel) => {
        personnel.dateNaiss = personnel.dateNaiss != null ? moment(personnel.dateNaiss) : null;
      });
    }
    return res;
  }
}
