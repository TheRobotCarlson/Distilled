import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { YeastSummary } from 'app/shared/model/yeast-summary.model';
import { YeastSummaryService } from './yeast-summary.service';
import { YeastSummaryComponent } from './yeast-summary.component';
import { YeastSummaryDetailComponent } from './yeast-summary-detail.component';
import { YeastSummaryUpdateComponent } from './yeast-summary-update.component';
import { YeastSummaryDeletePopupComponent } from './yeast-summary-delete-dialog.component';
import { IYeastSummary } from 'app/shared/model/yeast-summary.model';

@Injectable({ providedIn: 'root' })
export class YeastSummaryResolve implements Resolve<IYeastSummary> {
    constructor(private service: YeastSummaryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IYeastSummary> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<YeastSummary>) => response.ok),
                map((yeastSummary: HttpResponse<YeastSummary>) => yeastSummary.body)
            );
        }
        return of(new YeastSummary());
    }
}

export const yeastSummaryRoute: Routes = [
    {
        path: '',
        component: YeastSummaryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YeastSummaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: YeastSummaryDetailComponent,
        resolve: {
            yeastSummary: YeastSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YeastSummaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: YeastSummaryUpdateComponent,
        resolve: {
            yeastSummary: YeastSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YeastSummaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: YeastSummaryUpdateComponent,
        resolve: {
            yeastSummary: YeastSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YeastSummaries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const yeastSummaryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: YeastSummaryDeletePopupComponent,
        resolve: {
            yeastSummary: YeastSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YeastSummaries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
