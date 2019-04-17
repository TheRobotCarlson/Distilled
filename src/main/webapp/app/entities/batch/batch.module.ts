import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { DistilledSharedModule } from 'app/shared';
import {
    BatchComponent,
    BatchDetailComponent,
    BatchUpdateComponent,
    BatchDeletePopupComponent,
    BatchDeleteDialogComponent,
    batchRoute,
    batchPopupRoute
} from './';

const ENTITY_STATES = [...batchRoute, ...batchPopupRoute];

@NgModule({
    imports: [DistilledSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [BatchComponent, BatchDetailComponent, BatchUpdateComponent, BatchDeleteDialogComponent, BatchDeletePopupComponent],
    entryComponents: [BatchComponent, BatchUpdateComponent, BatchDeleteDialogComponent, BatchDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledBatchModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
