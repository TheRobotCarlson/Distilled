import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMasterSummary } from 'app/shared/model/master-summary.model';

@Component({
    selector: 'jhi-master-summary-detail',
    templateUrl: './master-summary-detail.component.html'
})
export class MasterSummaryDetailComponent implements OnInit {
    masterSummary: IMasterSummary;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ masterSummary }) => {
            this.masterSummary = masterSummary;
        });
    }

    previousState() {
        window.history.back();
    }
}
