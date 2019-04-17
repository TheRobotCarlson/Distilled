import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Grain } from 'app/shared/model/grain.model';
import { GrainService } from './grain.service';
import { GrainComponent } from './grain.component';
import { GrainDetailComponent } from './grain-detail.component';
import { GrainUpdateComponent } from './grain-update.component';
import { GrainDeletePopupComponent } from './grain-delete-dialog.component';
import { IGrain } from 'app/shared/model/grain.model';

@Injectable({ providedIn: 'root' })
export class GrainResolve implements Resolve<IGrain> {
    constructor(private service: GrainService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGrain> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Grain>) => response.ok),
                map((grain: HttpResponse<Grain>) => grain.body)
            );
        }
        return of(new Grain());
    }
}

export const grainRoute: Routes = [
    {
        path: '',
        component: GrainComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.grain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: GrainDetailComponent,
        resolve: {
            grain: GrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.grain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: GrainUpdateComponent,
        resolve: {
            grain: GrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.grain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: GrainUpdateComponent,
        resolve: {
            grain: GrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.grain.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const grainPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: GrainDeletePopupComponent,
        resolve: {
            grain: GrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'distilledApp.grain.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
