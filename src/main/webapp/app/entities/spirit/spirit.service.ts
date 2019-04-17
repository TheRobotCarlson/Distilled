import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISpirit } from 'app/shared/model/spirit.model';

type EntityResponseType = HttpResponse<ISpirit>;
type EntityArrayResponseType = HttpResponse<ISpirit[]>;

@Injectable({ providedIn: 'root' })
export class SpiritService {
    public resourceUrl = SERVER_API_URL + 'api/spirits';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/spirits';

    constructor(protected http: HttpClient) {}

    create(spirit: ISpirit): Observable<EntityResponseType> {
        return this.http.post<ISpirit>(this.resourceUrl, spirit, { observe: 'response' });
    }

    update(spirit: ISpirit): Observable<EntityResponseType> {
        return this.http.put<ISpirit>(this.resourceUrl, spirit, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISpirit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISpirit[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISpirit[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
