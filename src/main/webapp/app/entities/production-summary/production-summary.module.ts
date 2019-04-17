import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DistilledSharedModule } from 'app/shared';
import {
    ProductionSummaryComponent,
    ProductionSummaryDetailComponent,
    ProductionSummaryUpdateComponent,
    ProductionSummaryDeletePopupComponent,
    ProductionSummaryDeleteDialogComponent,
    productionSummaryRoute,
    productionSummaryPopupRoute
} from './';

const ENTITY_STATES = [...productionSummaryRoute, ...productionSummaryPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductionSummaryComponent,
        ProductionSummaryDetailComponent,
        ProductionSummaryUpdateComponent,
        ProductionSummaryDeleteDialogComponent,
        ProductionSummaryDeletePopupComponent
    ],
    entryComponents: [
        ProductionSummaryComponent,
        ProductionSummaryUpdateComponent,
        ProductionSummaryDeleteDialogComponent,
        ProductionSummaryDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledProductionSummaryModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
