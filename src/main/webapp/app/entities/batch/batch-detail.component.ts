import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBatch } from 'app/shared/model/batch.model';

@Component({
    selector: 'jhi-batch-detail',
    templateUrl: './batch-detail.component.html'
})
export class BatchDetailComponent implements OnInit {
    batch: IBatch;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ batch }) => {
            this.batch = batch;
        });
    }

    previousState() {
        window.history.back();
    }
}
