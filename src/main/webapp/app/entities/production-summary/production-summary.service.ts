import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductionSummary } from 'app/shared/model/production-summary.model';

type EntityResponseType = HttpResponse<IProductionSummary>;
type EntityArrayResponseType = HttpResponse<IProductionSummary[]>;

@Injectable({ providedIn: 'root' })
export class ProductionSummaryService {
    public resourceUrl = SERVER_API_URL + 'api/production-summaries';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/production-summaries';

    constructor(protected http: HttpClient) {}

    create(productionSummary: IProductionSummary): Observable<EntityResponseType> {
        return this.http.post<IProductionSummary>(this.resourceUrl, productionSummary, { observe: 'response' });
    }

    update(productionSummary: IProductionSummary): Observable<EntityResponseType> {
        return this.http.put<IProductionSummary>(this.resourceUrl, productionSummary, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductionSummary>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductionSummary[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductionSummary[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
