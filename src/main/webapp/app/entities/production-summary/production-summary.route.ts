import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductionSummary } from 'app/shared/model/production-summary.model';
import { ProductionSummaryService } from './production-summary.service';
import { ProductionSummaryComponent } from './production-summary.component';
import { ProductionSummaryDetailComponent } from './production-summary-detail.component';
import { ProductionSummaryUpdateComponent } from './production-summary-update.component';
import { ProductionSummaryDeletePopupComponent } from './production-summary-delete-dialog.component';
import { IProductionSummary } from 'app/shared/model/production-summary.model';

@Injectable({ providedIn: 'root' })
export class ProductionSummaryResolve implements Resolve<IProductionSummary> {
    constructor(private service: ProductionSummaryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductionSummary> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductionSummary>) => response.ok),
                map((productionSummary: HttpResponse<ProductionSummary>) => productionSummary.body)
            );
        }
        return of(new ProductionSummary());
    }
}

export const productionSummaryRoute: Routes = [
    {
        path: '',
        component: ProductionSummaryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.productionSummary.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProductionSummaryDetailComponent,
        resolve: {
            productionSummary: ProductionSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.productionSummary.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductionSummaryUpdateComponent,
        resolve: {
            productionSummary: ProductionSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.productionSummary.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductionSummaryUpdateComponent,
        resolve: {
            productionSummary: ProductionSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.productionSummary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productionSummaryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProductionSummaryDeletePopupComponent,
        resolve: {
            productionSummary: ProductionSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.productionSummary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
