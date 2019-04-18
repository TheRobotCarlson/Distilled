import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MashbillGrain } from 'app/shared/model/mashbill-grain.model';
import { MashbillGrainService } from './mashbill-grain.service';
import { MashbillGrainComponent } from './mashbill-grain.component';
import { MashbillGrainDetailComponent } from './mashbill-grain-detail.component';
import { MashbillGrainUpdateComponent } from './mashbill-grain-update.component';
import { MashbillGrainDeletePopupComponent } from './mashbill-grain-delete-dialog.component';
import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';

@Injectable({ providedIn: 'root' })
export class MashbillGrainResolve implements Resolve<IMashbillGrain> {
    constructor(private service: MashbillGrainService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMashbillGrain> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MashbillGrain>) => response.ok),
                map((mashbillGrain: HttpResponse<MashbillGrain>) => mashbillGrain.body)
            );
        }
        return of(new MashbillGrain());
    }
}

export const mashbillGrainRoute: Routes = [
    {
        path: '',
        component: MashbillGrainComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MashbillGrains'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MashbillGrainDetailComponent,
        resolve: {
            mashbillGrain: MashbillGrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MashbillGrains'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MashbillGrainUpdateComponent,
        resolve: {
            mashbillGrain: MashbillGrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MashbillGrains'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MashbillGrainUpdateComponent,
        resolve: {
            mashbillGrain: MashbillGrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MashbillGrains'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mashbillGrainPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MashbillGrainDeletePopupComponent,
        resolve: {
            mashbillGrain: MashbillGrainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MashbillGrains'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
