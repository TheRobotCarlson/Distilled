import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductionSummary } from 'app/shared/model/production-summary.model';

@Component({
    selector: 'jhi-production-summary-detail',
    templateUrl: './production-summary-detail.component.html'
})
export class ProductionSummaryDetailComponent implements OnInit {
    productionSummary: IProductionSummary;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productionSummary }) => {
            this.productionSummary = productionSummary;
        });
    }

    previousState() {
        window.history.back();
    }
}
