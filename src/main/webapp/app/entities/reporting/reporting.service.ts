import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReporting } from 'app/shared/model/reporting.model';

type EntityResponseType = HttpResponse<IReporting>;
type EntityArrayResponseType = HttpResponse<IReporting[]>;

@Injectable({ providedIn: 'root' })
export class ReportingService {
  public resourceUrl = SERVER_API_URL + 'api/reportings';

  constructor(protected http: HttpClient) {}

  create(reporting: IReporting): Observable<EntityResponseType> {
    return this.http.post<IReporting>(this.resourceUrl, reporting, { observe: 'response' });
  }

  update(reporting: IReporting): Observable<EntityResponseType> {
    return this.http.put<IReporting>(this.resourceUrl, reporting, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReporting>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReporting[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
