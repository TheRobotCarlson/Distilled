import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IYeast } from 'app/shared/model/yeast.model';

type EntityResponseType = HttpResponse<IYeast>;
type EntityArrayResponseType = HttpResponse<IYeast[]>;

@Injectable({ providedIn: 'root' })
export class YeastService {
    public resourceUrl = SERVER_API_URL + 'api/yeasts';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/yeasts';

    constructor(protected http: HttpClient) {}

    create(yeast: IYeast): Observable<EntityResponseType> {
        return this.http.post<IYeast>(this.resourceUrl, yeast, { observe: 'response' });
    }

    update(yeast: IYeast): Observable<EntityResponseType> {
        return this.http.put<IYeast>(this.resourceUrl, yeast, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IYeast>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IYeast[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IYeast[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
