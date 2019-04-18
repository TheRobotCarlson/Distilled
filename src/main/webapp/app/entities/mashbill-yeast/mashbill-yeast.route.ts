import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MashbillYeast } from 'app/shared/model/mashbill-yeast.model';
import { MashbillYeastService } from './mashbill-yeast.service';
import { MashbillYeastComponent } from './mashbill-yeast.component';
import { MashbillYeastDetailComponent } from './mashbill-yeast-detail.component';
import { MashbillYeastUpdateComponent } from './mashbill-yeast-update.component';
import { MashbillYeastDeletePopupComponent } from './mashbill-yeast-delete-dialog.component';
import { IMashbillYeast } from 'app/shared/model/mashbill-yeast.model';

@Injectable({ providedIn: 'root' })
export class MashbillYeastResolve implements Resolve<IMashbillYeast> {
    constructor(private service: MashbillYeastService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMashbillYeast> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MashbillYeast>) => response.ok),
                map((mashbillYeast: HttpResponse<MashbillYeast>) => mashbillYeast.body)
            );
        }
        return of(new MashbillYeast());
    }
}

export const mashbillYeastRoute: Routes = [
    {
        path: '',
        component: MashbillYeastComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MashbillYeasts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MashbillYeastDetailComponent,
        resolve: {
            mashbillYeast: MashbillYeastResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MashbillYeasts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MashbillYeastUpdateComponent,
        resolve: {
            mashbillYeast: MashbillYeastResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MashbillYeasts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MashbillYeastUpdateComponent,
        resolve: {
            mashbillYeast: MashbillYeastResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MashbillYeasts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mashbillYeastPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MashbillYeastDeletePopupComponent,
        resolve: {
            mashbillYeast: MashbillYeastResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MashbillYeasts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
