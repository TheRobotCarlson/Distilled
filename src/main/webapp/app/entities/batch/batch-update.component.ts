import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IBatch } from 'app/shared/model/batch.model';
import { BatchService } from './batch.service';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule';
import { IMashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from 'app/entities/mashbill';

@Component({
    selector: 'jhi-batch-update',
    templateUrl: './batch-update.component.html'
})
export class BatchUpdateComponent implements OnInit {
    batch: IBatch;
    isSaving: boolean;

    schedules: ISchedule[];

    mashbills: IMashbill[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected batchService: BatchService,
        protected scheduleService: ScheduleService,
        protected mashbillService: MashbillService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.date = new Date().toISOString().split('T')[0];
        this.activatedRoute.data.subscribe(({ batch }) => {
            this.batch = batch;
            this.date = this.batch.date != null ? this.batch.date.format(DATE_TIME_FORMAT) : this.date;
        });
        this.scheduleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISchedule[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISchedule[]>) => response.body)
            )
            .subscribe((res: ISchedule[]) => (this.schedules = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.mashbillService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMashbill[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMashbill[]>) => response.body)
            )
            .subscribe((res: IMashbill[]) => (this.mashbills = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.batch.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.batch.id !== undefined) {
            this.subscribeToSaveResponse(this.batchService.update(this.batch));
        } else {
            this.subscribeToSaveResponse(this.batchService.create(this.batch));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBatch>>) {
        result.subscribe((res: HttpResponse<IBatch>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackScheduleById(index: number, item: ISchedule) {
        return item.id;
    }

    trackMashbillById(index: number, item: IMashbill) {
        return item.id;
    }
}
