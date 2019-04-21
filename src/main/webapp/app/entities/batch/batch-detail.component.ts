import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBatch } from 'app/shared/model/batch.model';
import { BatchService } from './batch.service';

@Component({
    selector: 'jhi-batch-detail',
    templateUrl: './batch-detail.component.html'
})
export class BatchDetailComponent implements OnInit {
    batch: IBatch;
    barrelCount: number;

    constructor(protected activatedRoute: ActivatedRoute, private batchService: BatchService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ batch }) => {
            this.batch = batch;
        });
        this.batchService.countBatchBarrels(this.batch.id).subscribe(resp => {
            this.barrelCount = resp;
        });
    }

    previousState() {
        window.history.back();
    }
}
