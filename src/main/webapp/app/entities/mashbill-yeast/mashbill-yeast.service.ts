import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMashbillYeast } from 'app/shared/model/mashbill-yeast.model';

type EntityResponseType = HttpResponse<IMashbillYeast>;
type EntityArrayResponseType = HttpResponse<IMashbillYeast[]>;

@Injectable({ providedIn: 'root' })
export class MashbillYeastService {
    public resourceUrl = SERVER_API_URL + 'api/mashbill-yeasts';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/mashbill-yeasts';

    constructor(protected http: HttpClient) {}

    create(mashbillYeast: IMashbillYeast): Observable<EntityResponseType> {
        return this.http.post<IMashbillYeast>(this.resourceUrl, mashbillYeast, { observe: 'response' });
    }

    update(mashbillYeast: IMashbillYeast): Observable<EntityResponseType> {
        return this.http.put<IMashbillYeast>(this.resourceUrl, mashbillYeast, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMashbillYeast>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMashbillYeast[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMashbillYeast[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
