import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IYeastSummary } from 'app/shared/model/yeast-summary.model';

@Component({
    selector: 'jhi-yeast-summary-detail',
    templateUrl: './yeast-summary-detail.component.html'
})
export class YeastSummaryDetailComponent implements OnInit {
    yeastSummary: IYeastSummary;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ yeastSummary }) => {
            this.yeastSummary = yeastSummary;
        });
    }

    previousState() {
        window.history.back();
    }
}
