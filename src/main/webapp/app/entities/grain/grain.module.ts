import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DistilledSharedModule } from 'app/shared';
import {
    GrainComponent,
    GrainDetailComponent,
    GrainUpdateComponent,
    GrainDeletePopupComponent,
    GrainDeleteDialogComponent,
    grainRoute,
    grainPopupRoute
} from './';

const ENTITY_STATES = [...grainRoute, ...grainPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [GrainComponent, GrainDetailComponent, GrainUpdateComponent, GrainDeleteDialogComponent, GrainDeletePopupComponent],
    entryComponents: [GrainComponent, GrainUpdateComponent, GrainDeleteDialogComponent, GrainDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledGrainModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
