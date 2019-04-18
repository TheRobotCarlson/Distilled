import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistilledSharedModule } from 'app/shared';
import {
    ProductionScheduleComponent,
    ProductionScheduleDetailComponent,
    ProductionScheduleUpdateComponent,
    ProductionScheduleDeletePopupComponent,
    ProductionScheduleDeleteDialogComponent,
    productionScheduleRoute,
    productionSchedulePopupRoute
} from './';

const ENTITY_STATES = [...productionScheduleRoute, ...productionSchedulePopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductionScheduleComponent,
        ProductionScheduleDetailComponent,
        ProductionScheduleUpdateComponent,
        ProductionScheduleDeleteDialogComponent,
        ProductionScheduleDeletePopupComponent
    ],
    entryComponents: [
        ProductionScheduleComponent,
        ProductionScheduleUpdateComponent,
        ProductionScheduleDeleteDialogComponent,
        ProductionScheduleDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledProductionScheduleModule {}
