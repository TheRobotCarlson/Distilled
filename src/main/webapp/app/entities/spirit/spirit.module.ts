import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DistilledSharedModule } from 'app/shared';
import {
    SpiritComponent,
    SpiritDetailComponent,
    SpiritUpdateComponent,
    SpiritDeletePopupComponent,
    SpiritDeleteDialogComponent,
    spiritRoute,
    spiritPopupRoute
} from './';

const ENTITY_STATES = [...spiritRoute, ...spiritPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SpiritComponent, SpiritDetailComponent, SpiritUpdateComponent, SpiritDeleteDialogComponent, SpiritDeletePopupComponent],
    entryComponents: [SpiritComponent, SpiritUpdateComponent, SpiritDeleteDialogComponent, SpiritDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledSpiritModule {}
