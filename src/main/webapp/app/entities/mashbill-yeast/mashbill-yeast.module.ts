import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistilledSharedModule } from 'app/shared';
import {
    MashbillYeastComponent,
    MashbillYeastDetailComponent,
    MashbillYeastUpdateComponent,
    MashbillYeastDeletePopupComponent,
    MashbillYeastDeleteDialogComponent,
    mashbillYeastRoute,
    mashbillYeastPopupRoute
} from './';

const ENTITY_STATES = [...mashbillYeastRoute, ...mashbillYeastPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MashbillYeastComponent,
        MashbillYeastDetailComponent,
        MashbillYeastUpdateComponent,
        MashbillYeastDeleteDialogComponent,
        MashbillYeastDeletePopupComponent
    ],
    entryComponents: [
        MashbillYeastComponent,
        MashbillYeastUpdateComponent,
        MashbillYeastDeleteDialogComponent,
        MashbillYeastDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledMashbillYeastModule {}
