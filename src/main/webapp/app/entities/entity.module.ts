import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'grain',
                loadChildren: './grain/grain.module#DistilledGrainModule'
            },
            {
                path: 'yeast',
                loadChildren: './yeast/yeast.module#DistilledYeastModule'
            },
            {
                path: 'mashbill-grain',
                loadChildren: './mashbill-grain/mashbill-grain.module#DistilledMashbillGrainModule'
            },
            {
                path: 'customer',
                loadChildren: './customer/customer.module#DistilledCustomerModule'
            },
            {
                path: 'spirit',
                loadChildren: './spirit/spirit.module#DistilledSpiritModule'
            },
            {
                path: 'mashbill',
                loadChildren: './mashbill/mashbill.module#DistilledMashbillModule'
            },
            {
                path: 'warehouse',
                loadChildren: './warehouse/warehouse.module#DistilledWarehouseModule'
            },
            {
                path: 'barrel',
                loadChildren: './barrel/barrel.module#DistilledBarrelModule'
            },
            {
                path: 'schedule',
                loadChildren: './schedule/schedule.module#DistilledScheduleModule'
            },
            {
                path: 'batch',
                loadChildren: './batch/batch.module#DistilledBatchModule'
            },
            {
                path: 'production-schedule',
                loadChildren: './production-schedule/production-schedule.module#DistilledProductionScheduleModule'
            },
            {
                path: 'grain-forecast',
                loadChildren: './grain-forecast/grain-forecast.module#DistilledGrainForecastModule'
            },
            {
                path: 'production-summary',
                loadChildren: './production-summary/production-summary.module#DistilledProductionSummaryModule'
            },
            {
                path: 'yeast-summary',
                loadChildren: './yeast-summary/yeast-summary.module#DistilledYeastSummaryModule'
            },
            {
                path: 'master-summary',
                loadChildren: './master-summary/master-summary.module#DistilledMasterSummaryModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DistilledEntityModule {}
