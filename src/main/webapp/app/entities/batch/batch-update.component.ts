import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IBatch } from 'app/shared/model/batch.model';
import { BatchService } from './batch.service';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { WarehouseService } from 'app/entities/warehouse';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule';
import { Barrel, IBarrel } from 'app/shared/model/barrel.model';
import { BarrelService } from '../barrel';

@Component({
    selector: 'jhi-batch-update',
    templateUrl: './batch-update.component.html'
})
export class BatchUpdateComponent implements OnInit {
    batch: IBatch;
    isSaving: boolean;

    sched: ISchedule;

    warehouses: IWarehouse[];

    numBarrels: number;

    schedules: ISchedule[];
    date: string;
    orderCode: string;

    batchSaved: boolean = false;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected batchService: BatchService,
        protected warehouseService: WarehouseService,
        protected scheduleService: ScheduleService,
        protected activatedRoute: ActivatedRoute,
        protected barrelService: BarrelService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.date = new Date().toISOString().split('T')[0];

        this.activatedRoute.data.subscribe(({ batch }) => {
            this.batch = batch;
            this.date = this.batch.date != null ? this.batch.date.format(DATE_TIME_FORMAT) : this.date;
            console.log(this.batch);
        });
        this.warehouseService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IWarehouse[]>) => mayBeOk.ok),
                map((response: HttpResponse<IWarehouse[]>) => response.body)
            )
            .subscribe((res: IWarehouse[]) => (this.warehouses = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.scheduleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISchedule[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISchedule[]>) => response.body)
            )
            .subscribe(
                (res: ISchedule[]) => {
                    this.schedules = res;
                    this.batch.scheduleId = this.schedules[this.schedules.length - 1].id;
                    this.createOrderCode(this.schedules[this.schedules.length - 1].mashbillMashbillCode);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    getMashbillFromSchedule() {
        this.scheduleService.find(this.batch.scheduleId).subscribe(res => {
            return res.body.mashbillMashbillCode;
        });
    }

    createOrderCode(mashbill: String) {
        const temp = this.date.split('-');
        const arr = 'ABCDEFGHIJKL';
        const month = parseInt(temp[1], 10);

        this.batch.orderCode = temp[0].substring(2, 4) + arr[month - 1] + temp[2] + mashbill;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.batch.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        this.batch.scheduleId = this.sched.id;

        if (this.batch.id !== undefined) {
            this.subscribeToSaveResponse(this.batchService.update(this.batch));
        } else {
            this.subscribeToSaveResponse(this.batchService.create(this.batch));
        }
    }

    protected subscribeToBarrelSaveResponse(result: Observable<HttpResponse<IBarrel>>, index: number) {
        result.subscribe(
            (res: HttpResponse<IBarrel>) => {
                this.batch.barrels[index] = res.body;
                console.log(res.body);
            },
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBatch>>) {
        result.subscribe(
            (res: HttpResponse<IBatch>) => {
                //this.onSaveSuccess();
                this.batch = res.body;
                console.log('WORKING BABY: ');
                console.log(this.batch);

                this.batch.barrels = [];
                for (let i = 0; i < this.numBarrels; i = i + 1) {
                    let barrel = new Barrel();
                    barrel.barreledDate = this.batch.date;
                    barrel.batchOrderCode = this.batch.orderCode;
                    barrel.customerCustomerCode = this.sched.customerCustomerCode;
                    barrel.customerId = this.sched.customerId;
                    barrel.mashbillId = this.sched.mashbillId;
                    barrel.mashbillMashbillCode = this.sched.mashbillMashbillCode;
                    barrel.warehouseId = this.batch.warehouseId;
                    barrel.warehouseWarehouseCode = this.batch.warehouseWarehouseCode;
                    barrel.batchId = this.batch.id;
                    this.batch.barrels.push(barrel);
                    this.subscribeToBarrelSaveResponse(this.barrelService.create(barrel), i);
                }
                console.log(this.batch.barrels);

                this.onSaveSuccess();
            },
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackWarehouseById(index: number, item: IWarehouse) {
        return item.id;
    }

    trackScheduleById(index: number, item: ISchedule) {
        return item.id;
    }
}
