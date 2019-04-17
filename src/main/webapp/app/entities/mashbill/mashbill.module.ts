import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DistilledSharedModule } from 'app/shared';
import {
    MashbillComponent,
    MashbillDetailComponent,
    MashbillUpdateComponent,
    MashbillDeletePopupComponent,
    MashbillDeleteDialogComponent,
    mashbillRoute,
    mashbillPopupRoute
} from './';

const ENTITY_STATES = [...mashbillRoute, ...mashbillPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MashbillComponent,
        MashbillDetailComponent,
        MashbillUpdateComponent,
        MashbillDeleteDialogComponent,
        MashbillDeletePopupComponent
    ],
    entryComponents: [MashbillComponent, MashbillUpdateComponent, MashbillDeleteDialogComponent, MashbillDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledMashbillModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
