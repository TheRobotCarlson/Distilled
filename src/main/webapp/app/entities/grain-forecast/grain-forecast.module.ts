import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistilledSharedModule } from 'app/shared';
import {
    GrainForecastComponent,
    GrainForecastDetailComponent,
    GrainForecastUpdateComponent,
    GrainForecastDeletePopupComponent,
    GrainForecastDeleteDialogComponent,
    grainForecastRoute,
    grainForecastPopupRoute
} from './';

const ENTITY_STATES = [...grainForecastRoute, ...grainForecastPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GrainForecastComponent,
        GrainForecastDetailComponent,
        GrainForecastUpdateComponent,
        GrainForecastDeleteDialogComponent,
        GrainForecastDeletePopupComponent
    ],
    entryComponents: [
        GrainForecastComponent,
        GrainForecastUpdateComponent,
        GrainForecastDeleteDialogComponent,
        GrainForecastDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledGrainForecastModule {}
