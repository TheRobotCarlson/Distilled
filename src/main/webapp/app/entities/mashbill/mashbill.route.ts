import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from './mashbill.service';
import { MashbillComponent } from './mashbill.component';
import { MashbillDetailComponent } from './mashbill-detail.component';
import { MashbillUpdateComponent } from './mashbill-update.component';
import { MashbillDeletePopupComponent } from './mashbill-delete-dialog.component';
import { IMashbill } from 'app/shared/model/mashbill.model';

@Injectable({ providedIn: 'root' })
export class MashbillResolve implements Resolve<IMashbill> {
    constructor(private service: MashbillService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMashbill> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Mashbill>) => response.ok),
                map((mashbill: HttpResponse<Mashbill>) => mashbill.body)
            );
        }
        return of(new Mashbill());
    }
}

export const mashbillRoute: Routes = [
    {
        path: '',
        component: MashbillComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mashbills'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MashbillDetailComponent,
        resolve: {
            mashbill: MashbillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mashbills'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MashbillUpdateComponent,
        resolve: {
            mashbill: MashbillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mashbills'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MashbillUpdateComponent,
        resolve: {
            mashbill: MashbillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mashbills'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mashbillPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MashbillDeletePopupComponent,
        resolve: {
            mashbill: MashbillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mashbills'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
