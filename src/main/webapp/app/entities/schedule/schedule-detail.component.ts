import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISchedule } from 'app/shared/model/schedule.model';

@Component({
    selector: 'jhi-schedule-detail',
    templateUrl: './schedule-detail.component.html'
})
export class ScheduleDetailComponent implements OnInit {
    schedule: ISchedule;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ schedule }) => {
            this.schedule = schedule;
        });
    }

    previousState() {
        window.history.back();
    }
}
