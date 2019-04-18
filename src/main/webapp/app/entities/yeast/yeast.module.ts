import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistilledSharedModule } from 'app/shared';
import {
    YeastComponent,
    YeastDetailComponent,
    YeastUpdateComponent,
    YeastDeletePopupComponent,
    YeastDeleteDialogComponent,
    yeastRoute,
    yeastPopupRoute
} from './';

const ENTITY_STATES = [...yeastRoute, ...yeastPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [YeastComponent, YeastDetailComponent, YeastUpdateComponent, YeastDeleteDialogComponent, YeastDeletePopupComponent],
    entryComponents: [YeastComponent, YeastUpdateComponent, YeastDeleteDialogComponent, YeastDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledYeastModule {}
