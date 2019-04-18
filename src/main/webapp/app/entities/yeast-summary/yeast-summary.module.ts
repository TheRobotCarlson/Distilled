import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistilledSharedModule } from 'app/shared';
import {
    YeastSummaryComponent,
    YeastSummaryDetailComponent,
    YeastSummaryUpdateComponent,
    YeastSummaryDeletePopupComponent,
    YeastSummaryDeleteDialogComponent,
    yeastSummaryRoute,
    yeastSummaryPopupRoute
} from './';

const ENTITY_STATES = [...yeastSummaryRoute, ...yeastSummaryPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        YeastSummaryComponent,
        YeastSummaryDetailComponent,
        YeastSummaryUpdateComponent,
        YeastSummaryDeleteDialogComponent,
        YeastSummaryDeletePopupComponent
    ],
    entryComponents: [
        YeastSummaryComponent,
        YeastSummaryUpdateComponent,
        YeastSummaryDeleteDialogComponent,
        YeastSummaryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledYeastSummaryModule {}
