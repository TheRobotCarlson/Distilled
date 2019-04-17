import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

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
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledSpiritModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
