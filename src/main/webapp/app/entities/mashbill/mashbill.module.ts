import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistilledSharedModule } from 'app/shared';
import {
    MashbillComponent,
    MashbillDetailComponent,
    MashbillUpdateComponent,
    MashbillDeletePopupComponent,
    MashbillDeleteDialogComponent,
    mashbillRoute,
    mashbillPopupRoute
} from './';

const ENTITY_STATES = [...mashbillRoute, ...mashbillPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MashbillComponent,
        MashbillDetailComponent,
        MashbillUpdateComponent,
        MashbillDeleteDialogComponent,
        MashbillDeletePopupComponent
    ],
    entryComponents: [MashbillComponent, MashbillUpdateComponent, MashbillDeleteDialogComponent, MashbillDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledMashbillModule {}
