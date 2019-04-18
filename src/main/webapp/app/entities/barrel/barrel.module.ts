import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistilledSharedModule } from 'app/shared';
import {
    BarrelComponent,
    BarrelDetailComponent,
    BarrelUpdateComponent,
    BarrelDeletePopupComponent,
    BarrelDeleteDialogComponent,
    barrelRoute,
    barrelPopupRoute
} from './';

const ENTITY_STATES = [...barrelRoute, ...barrelPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [BarrelComponent, BarrelDetailComponent, BarrelUpdateComponent, BarrelDeleteDialogComponent, BarrelDeletePopupComponent],
    entryComponents: [BarrelComponent, BarrelUpdateComponent, BarrelDeleteDialogComponent, BarrelDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledBarrelModule {}
