import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductionSchedule } from 'app/shared/model/production-schedule.model';
import { ProductionScheduleService } from './production-schedule.service';
import { ProductionScheduleComponent } from './production-schedule.component';
import { ProductionScheduleDetailComponent } from './production-schedule-detail.component';
import { ProductionScheduleUpdateComponent } from './production-schedule-update.component';
import { ProductionScheduleDeletePopupComponent } from './production-schedule-delete-dialog.component';
import { IProductionSchedule } from 'app/shared/model/production-schedule.model';

@Injectable({ providedIn: 'root' })
export class ProductionScheduleResolve implements Resolve<IProductionSchedule> {
    constructor(private service: ProductionScheduleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductionSchedule> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductionSchedule>) => response.ok),
                map((productionSchedule: HttpResponse<ProductionSchedule>) => productionSchedule.body)
            );
        }
        return of(new ProductionSchedule());
    }
}

export const productionScheduleRoute: Routes = [
    {
        path: '',
        component: ProductionScheduleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionSchedules'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProductionScheduleDetailComponent,
        resolve: {
            productionSchedule: ProductionScheduleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionSchedules'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductionScheduleUpdateComponent,
        resolve: {
            productionSchedule: ProductionScheduleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionSchedules'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductionScheduleUpdateComponent,
        resolve: {
            productionSchedule: ProductionScheduleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionSchedules'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productionSchedulePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProductionScheduleDeletePopupComponent,
        resolve: {
            productionSchedule: ProductionScheduleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionSchedules'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
