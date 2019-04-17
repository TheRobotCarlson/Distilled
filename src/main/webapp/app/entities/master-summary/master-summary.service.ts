import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMasterSummary } from 'app/shared/model/master-summary.model';

type EntityResponseType = HttpResponse<IMasterSummary>;
type EntityArrayResponseType = HttpResponse<IMasterSummary[]>;

@Injectable({ providedIn: 'root' })
export class MasterSummaryService {
    public resourceUrl = SERVER_API_URL + 'api/master-summaries';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/master-summaries';

    constructor(protected http: HttpClient) {}

    create(masterSummary: IMasterSummary): Observable<EntityResponseType> {
        return this.http.post<IMasterSummary>(this.resourceUrl, masterSummary, { observe: 'response' });
    }

    update(masterSummary: IMasterSummary): Observable<EntityResponseType> {
        return this.http.put<IMasterSummary>(this.resourceUrl, masterSummary, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMasterSummary>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMasterSummary[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMasterSummary[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
