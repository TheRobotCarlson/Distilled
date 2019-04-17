import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

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
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledProductionScheduleModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
