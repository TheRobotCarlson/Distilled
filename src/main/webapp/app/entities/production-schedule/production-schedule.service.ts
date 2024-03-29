import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductionSchedule } from 'app/shared/model/production-schedule.model';

type EntityResponseType = HttpResponse<IProductionSchedule>;
type EntityArrayResponseType = HttpResponse<IProductionSchedule[]>;

@Injectable({ providedIn: 'root' })
export class ProductionScheduleService {
    public resourceUrl = SERVER_API_URL + 'api/production-schedules';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/production-schedules';

    constructor(protected http: HttpClient) {}

    create(productionSchedule: IProductionSchedule): Observable<EntityResponseType> {
        return this.http.post<IProductionSchedule>(this.resourceUrl, productionSchedule, { observe: 'response' });
    }

    update(productionSchedule: IProductionSchedule): Observable<EntityResponseType> {
        return this.http.put<IProductionSchedule>(this.resourceUrl, productionSchedule, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductionSchedule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductionSchedule[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductionSchedule[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
