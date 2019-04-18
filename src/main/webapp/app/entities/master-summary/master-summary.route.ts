import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MasterSummary } from 'app/shared/model/master-summary.model';
import { MasterSummaryService } from './master-summary.service';
import { MasterSummaryComponent } from './master-summary.component';
import { MasterSummaryDetailComponent } from './master-summary-detail.component';
import { MasterSummaryUpdateComponent } from './master-summary-update.component';
import { MasterSummaryDeletePopupComponent } from './master-summary-delete-dialog.component';
import { IMasterSummary } from 'app/shared/model/master-summary.model';

@Injectable({ providedIn: 'root' })
export class MasterSummaryResolve implements Resolve<IMasterSummary> {
    constructor(private service: MasterSummaryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMasterSummary> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MasterSummary>) => response.ok),
                map((masterSummary: HttpResponse<MasterSummary>) => masterSummary.body)
            );
        }
        return of(new MasterSummary());
    }
}

export const masterSummaryRoute: Routes = [
    {
        path: '',
        component: MasterSummaryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasterSummaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MasterSummaryDetailComponent,
        resolve: {
            masterSummary: MasterSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasterSummaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MasterSummaryUpdateComponent,
        resolve: {
            masterSummary: MasterSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasterSummaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MasterSummaryUpdateComponent,
        resolve: {
            masterSummary: MasterSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasterSummaries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const masterSummaryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MasterSummaryDeletePopupComponent,
        resolve: {
            masterSummary: MasterSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MasterSummaries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
