import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

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
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledYeastSummaryModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
