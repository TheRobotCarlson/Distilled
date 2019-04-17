import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DistilledSharedModule } from 'app/shared';
import {
    MashbillGrainComponent,
    MashbillGrainDetailComponent,
    MashbillGrainUpdateComponent,
    MashbillGrainDeletePopupComponent,
    MashbillGrainDeleteDialogComponent,
    mashbillGrainRoute,
    mashbillGrainPopupRoute
} from './';

const ENTITY_STATES = [...mashbillGrainRoute, ...mashbillGrainPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MashbillGrainComponent,
        MashbillGrainDetailComponent,
        MashbillGrainUpdateComponent,
        MashbillGrainDeleteDialogComponent,
        MashbillGrainDeletePopupComponent
    ],
    entryComponents: [
        MashbillGrainComponent,
        MashbillGrainUpdateComponent,
        MashbillGrainDeleteDialogComponent,
        MashbillGrainDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledMashbillGrainModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
