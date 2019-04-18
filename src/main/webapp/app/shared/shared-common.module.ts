import { NgModule } from '@angular/core';

import { DistilledSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [DistilledSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [DistilledSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class DistilledSharedCommonModule {}
