import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Spirit } from 'app/shared/model/spirit.model';
import { SpiritService } from './spirit.service';
import { SpiritComponent } from './spirit.component';
import { SpiritDetailComponent } from './spirit-detail.component';
import { SpiritUpdateComponent } from './spirit-update.component';
import { SpiritDeletePopupComponent } from './spirit-delete-dialog.component';
import { ISpirit } from 'app/shared/model/spirit.model';

@Injectable({ providedIn: 'root' })
export class SpiritResolve implements Resolve<ISpirit> {
    constructor(private service: SpiritService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISpirit> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Spirit>) => response.ok),
                map((spirit: HttpResponse<Spirit>) => spirit.body)
            );
        }
        return of(new Spirit());
    }
}

export const spiritRoute: Routes = [
    {
        path: '',
        component: SpiritComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Spirits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SpiritDetailComponent,
        resolve: {
            spirit: SpiritResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Spirits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SpiritUpdateComponent,
        resolve: {
            spirit: SpiritResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Spirits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SpiritUpdateComponent,
        resolve: {
            spirit: SpiritResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Spirits'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const spiritPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SpiritDeletePopupComponent,
        resolve: {
            spirit: SpiritResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Spirits'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
