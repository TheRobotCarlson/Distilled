import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Batch } from 'app/shared/model/batch.model';
import { BatchService } from './batch.service';
import { BatchComponent } from './batch.component';
import { BatchDetailComponent } from './batch-detail.component';
import { BatchUpdateComponent } from './batch-update.component';
import { BatchDeletePopupComponent } from './batch-delete-dialog.component';
import { IBatch } from 'app/shared/model/batch.model';

@Injectable({ providedIn: 'root' })
export class BatchResolve implements Resolve<IBatch> {
    constructor(private service: BatchService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBatch> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Batch>) => response.ok),
                map((batch: HttpResponse<Batch>) => batch.body)
            );
        }
        return of(new Batch());
    }
}

export const batchRoute: Routes = [
    {
        path: '',
        component: BatchComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.batch.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: BatchDetailComponent,
        resolve: {
            batch: BatchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.batch.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BatchUpdateComponent,
        resolve: {
            batch: BatchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.batch.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: BatchUpdateComponent,
        resolve: {
            batch: BatchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.batch.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const batchPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: BatchDeletePopupComponent,
        resolve: {
            batch: BatchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.batch.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
