import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IYeastSummary } from 'app/shared/model/yeast-summary.model';

type EntityResponseType = HttpResponse<IYeastSummary>;
type EntityArrayResponseType = HttpResponse<IYeastSummary[]>;

@Injectable({ providedIn: 'root' })
export class YeastSummaryService {
    public resourceUrl = SERVER_API_URL + 'api/yeast-summaries';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/yeast-summaries';

    constructor(protected http: HttpClient) {}

    create(yeastSummary: IYeastSummary): Observable<EntityResponseType> {
        return this.http.post<IYeastSummary>(this.resourceUrl, yeastSummary, { observe: 'response' });
    }

    update(yeastSummary: IYeastSummary): Observable<EntityResponseType> {
        return this.http.put<IYeastSummary>(this.resourceUrl, yeastSummary, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IYeastSummary>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IYeastSummary[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IYeastSummary[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
