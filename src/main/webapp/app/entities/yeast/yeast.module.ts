import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DistilledSharedModule } from 'app/shared';
import {
    YeastComponent,
    YeastDetailComponent,
    YeastUpdateComponent,
    YeastDeletePopupComponent,
    YeastDeleteDialogComponent,
    yeastRoute,
    yeastPopupRoute
} from './';

const ENTITY_STATES = [...yeastRoute, ...yeastPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [YeastComponent, YeastDetailComponent, YeastUpdateComponent, YeastDeleteDialogComponent, YeastDeletePopupComponent],
    entryComponents: [YeastComponent, YeastUpdateComponent, YeastDeleteDialogComponent, YeastDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledYeastModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
