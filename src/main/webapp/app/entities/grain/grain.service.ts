import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGrain } from 'app/shared/model/grain.model';

type EntityResponseType = HttpResponse<IGrain>;
type EntityArrayResponseType = HttpResponse<IGrain[]>;

@Injectable({ providedIn: 'root' })
export class GrainService {
    public resourceUrl = SERVER_API_URL + 'api/grains';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/grains';

    constructor(protected http: HttpClient) {}

    create(grain: IGrain): Observable<EntityResponseType> {
        return this.http.post<IGrain>(this.resourceUrl, grain, { observe: 'response' });
    }

    update(grain: IGrain): Observable<EntityResponseType> {
        return this.http.put<IGrain>(this.resourceUrl, grain, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGrain>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGrain[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGrain[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
