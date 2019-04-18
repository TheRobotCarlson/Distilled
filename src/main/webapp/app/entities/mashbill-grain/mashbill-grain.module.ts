import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistilledSharedModule } from 'app/shared';
import {
    MashbillGrainComponent,
    MashbillGrainDetailComponent,
    MashbillGrainUpdateComponent,
    MashbillGrainDeletePopupComponent,
    MashbillGrainDeleteDialogComponent,
    mashbillGrainRoute,
    mashbillGrainPopupRoute
} from './';

const ENTITY_STATES = [...mashbillGrainRoute, ...mashbillGrainPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MashbillGrainComponent,
        MashbillGrainDetailComponent,
        MashbillGrainUpdateComponent,
        MashbillGrainDeleteDialogComponent,
        MashbillGrainDeletePopupComponent
    ],
    entryComponents: [
        MashbillGrainComponent,
        MashbillGrainUpdateComponent,
        MashbillGrainDeleteDialogComponent,
        MashbillGrainDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledMashbillGrainModule {}
