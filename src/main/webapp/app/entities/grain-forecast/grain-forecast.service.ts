import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGrainForecast } from 'app/shared/model/grain-forecast.model';

type EntityResponseType = HttpResponse<IGrainForecast>;
type EntityArrayResponseType = HttpResponse<IGrainForecast[]>;

@Injectable({ providedIn: 'root' })
export class GrainForecastService {
    public resourceUrl = SERVER_API_URL + 'api/grain-forecasts';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/grain-forecasts';

    constructor(protected http: HttpClient) {}

    create(grainForecast: IGrainForecast): Observable<EntityResponseType> {
        return this.http.post<IGrainForecast>(this.resourceUrl, grainForecast, { observe: 'response' });
    }

    update(grainForecast: IGrainForecast): Observable<EntityResponseType> {
        return this.http.put<IGrainForecast>(this.resourceUrl, grainForecast, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGrainForecast>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGrainForecast[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGrainForecast[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
