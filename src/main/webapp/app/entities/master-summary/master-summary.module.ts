import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

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
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledMasterSummaryModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
