import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductionSchedule } from 'app/shared/model/production-schedule.model';

@Component({
    selector: 'jhi-production-schedule-detail',
    templateUrl: './production-schedule-detail.component.html'
})
export class ProductionScheduleDetailComponent implements OnInit {
    productionSchedule: IProductionSchedule;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productionSchedule }) => {
            this.productionSchedule = productionSchedule;
        });
    }

    previousState() {
        window.history.back();
    }
}
