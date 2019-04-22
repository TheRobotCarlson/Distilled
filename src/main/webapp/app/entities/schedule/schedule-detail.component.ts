import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISchedule } from 'app/shared/model/schedule.model';
import { BatchService } from '../batch';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IBatch } from 'app/shared/model/batch.model';

@Component({
    selector: 'jhi-schedule-detail',
    templateUrl: './schedule-detail.component.html'
})
export class ScheduleDetailComponent implements OnInit {
    schedule: ISchedule;

    batches: IBatch[];

    numBarrels: number;

    constructor(protected activatedRoute: ActivatedRoute, protected batchService: BatchService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ schedule }) => {
            this.schedule = schedule;
        });
        this.numBarrels = 0;
        this.batchService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IBatch[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBatch[]>) => response.body)
            )
            .subscribe((resp: IBatch[]) => {
                this.batches = resp;
                this.batches.forEach((item, index) => {
                    this.batchService.countBatchBarrels(item.id).subscribe(batchResp => {
                        if (item.scheduleId === this.schedule.id) {
                            this.numBarrels = this.numBarrels + batchResp;
                        }
                    });
                });
            });
    }

    previousState() {
        window.history.back();
    }
}
