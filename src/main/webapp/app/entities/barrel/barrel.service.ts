import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBarrel } from 'app/shared/model/barrel.model';

type EntityResponseType = HttpResponse<IBarrel>;
type EntityArrayResponseType = HttpResponse<IBarrel[]>;

@Injectable({ providedIn: 'root' })
export class BarrelService {
    public resourceUrl = SERVER_API_URL + 'api/barrels';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/barrels';

    constructor(protected http: HttpClient) {}

    create(barrel: IBarrel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(barrel);
        return this.http
            .post<IBarrel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(barrel: IBarrel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(barrel);
        return this.http
            .put<IBarrel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBarrel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBarrel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBarrel[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(barrel: IBarrel): IBarrel {
        const copy: IBarrel = Object.assign({}, barrel, {
            barreledDate: barrel.barreledDate != null && barrel.barreledDate.isValid() ? barrel.barreledDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.barreledDate = res.body.barreledDate != null ? moment(res.body.barreledDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((barrel: IBarrel) => {
                barrel.barreledDate = barrel.barreledDate != null ? moment(barrel.barreledDate) : null;
            });
        }
        return res;
    }
}
