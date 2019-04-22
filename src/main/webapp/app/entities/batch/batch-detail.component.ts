import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBatch } from 'app/shared/model/batch.model';
import { BatchService } from './batch.service';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from '../schedule';

@Component({
    selector: 'jhi-batch-detail',
    templateUrl: './batch-detail.component.html'
})
export class BatchDetailComponent implements OnInit {
    batch: IBatch;
    barrelCount: number;
    sched: ISchedule;

    constructor(protected activatedRoute: ActivatedRoute, private batchService: BatchService, private scheduleService: ScheduleService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ batch }) => {
            this.batch = batch;
        });
        this.batchService.countBatchBarrels(this.batch.id).subscribe(resp => {
            this.barrelCount = resp;
        });
        this.scheduleService.find(this.batch.scheduleId).subscribe(res => {
            this.sched = res.body;
        });
    }

    previousState() {
        window.history.back();
    }
}
