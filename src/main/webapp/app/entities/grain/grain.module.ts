import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistilledSharedModule } from 'app/shared';
import {
    GrainComponent,
    GrainDetailComponent,
    GrainUpdateComponent,
    GrainDeletePopupComponent,
    GrainDeleteDialogComponent,
    grainRoute,
    grainPopupRoute
} from './';

const ENTITY_STATES = [...grainRoute, ...grainPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [GrainComponent, GrainDetailComponent, GrainUpdateComponent, GrainDeleteDialogComponent, GrainDeletePopupComponent],
    entryComponents: [GrainComponent, GrainUpdateComponent, GrainDeleteDialogComponent, GrainDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledGrainModule {}
