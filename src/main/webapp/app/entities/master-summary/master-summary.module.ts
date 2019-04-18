import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistilledSharedModule } from 'app/shared';
import {
    MasterSummaryComponent,
    MasterSummaryDetailComponent,
    MasterSummaryUpdateComponent,
    MasterSummaryDeletePopupComponent,
    MasterSummaryDeleteDialogComponent,
    masterSummaryRoute,
    masterSummaryPopupRoute
} from './';

const ENTITY_STATES = [...masterSummaryRoute, ...masterSummaryPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MasterSummaryComponent,
        MasterSummaryDetailComponent,
        MasterSummaryUpdateComponent,
        MasterSummaryDeleteDialogComponent,
        MasterSummaryDeletePopupComponent
    ],
    entryComponents: [
        MasterSummaryComponent,
        MasterSummaryUpdateComponent,
        MasterSummaryDeleteDialogComponent,
        MasterSummaryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledMasterSummaryModule {}
