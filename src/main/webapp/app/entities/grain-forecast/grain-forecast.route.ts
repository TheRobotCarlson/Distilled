import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GrainForecast } from 'app/shared/model/grain-forecast.model';
import { GrainForecastService } from './grain-forecast.service';
import { GrainForecastComponent } from './grain-forecast.component';
import { GrainForecastDetailComponent } from './grain-forecast-detail.component';
import { GrainForecastUpdateComponent } from './grain-forecast-update.component';
import { GrainForecastDeletePopupComponent } from './grain-forecast-delete-dialog.component';
import { IGrainForecast } from 'app/shared/model/grain-forecast.model';

@Injectable({ providedIn: 'root' })
export class GrainForecastResolve implements Resolve<IGrainForecast> {
    constructor(private service: GrainForecastService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGrainForecast> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GrainForecast>) => response.ok),
                map((grainForecast: HttpResponse<GrainForecast>) => grainForecast.body)
            );
        }
        return of(new GrainForecast());
    }
}

export const grainForecastRoute: Routes = [
    {
        path: '',
        component: GrainForecastComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.grainForecast.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: GrainForecastDetailComponent,
        resolve: {
            grainForecast: GrainForecastResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.grainForecast.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: GrainForecastUpdateComponent,
        resolve: {
            grainForecast: GrainForecastResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.grainForecast.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: GrainForecastUpdateComponent,
        resolve: {
            grainForecast: GrainForecastResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.grainForecast.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const grainForecastPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: GrainForecastDeletePopupComponent,
        resolve: {
            grainForecast: GrainForecastResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.grainForecast.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
