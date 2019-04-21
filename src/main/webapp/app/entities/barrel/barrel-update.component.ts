import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IBarrel } from 'app/shared/model/barrel.model';
import { BarrelService } from './barrel.service';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { WarehouseService } from 'app/entities/warehouse';
import { IMashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from 'app/entities/mashbill';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';
import { IBatch } from 'app/shared/model/batch.model';
import { BatchService } from 'app/entities/batch';

@Component({
    selector: 'jhi-barrel-update',
    templateUrl: './barrel-update.component.html'
})
export class BarrelUpdateComponent implements OnInit {
    barrel: IBarrel;
    isSaving: boolean;

    warehouses: IWarehouse[];

    mashbills: IMashbill[];

    customers: ICustomer[];

    batches: IBatch[];
    barreledDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected barrelService: BarrelService,
        protected warehouseService: WarehouseService,
        protected mashbillService: MashbillService,
        protected customerService: CustomerService,
        protected batchService: BatchService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.barreledDate = new Date().toISOString().split('T')[0];
        this.activatedRoute.data.subscribe(({ barrel }) => {
            this.barrel = barrel;
            this.barreledDate = this.barrel.barreledDate != null ? this.barrel.barreledDate.format(DATE_TIME_FORMAT) : null;
        });
        this.warehouseService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IWarehouse[]>) => mayBeOk.ok),
                map((response: HttpResponse<IWarehouse[]>) => response.body)
            )
            .subscribe((res: IWarehouse[]) => (this.warehouses = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.mashbillService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMashbill[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMashbill[]>) => response.body)
            )
            .subscribe((res: IMashbill[]) => (this.mashbills = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.customerService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICustomer[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICustomer[]>) => response.body)
            )
            .subscribe((res: ICustomer[]) => (this.customers = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.batchService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IBatch[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBatch[]>) => response.body)
            )
            .subscribe((res: IBatch[]) => (this.batches = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.barrel.barreledDate = this.barreledDate != null ? moment(this.barreledDate, DATE_TIME_FORMAT) : null;
        if (this.barrel.id !== undefined) {
            this.subscribeToSaveResponse(this.barrelService.update(this.barrel));
        } else {
            this.subscribeToSaveResponse(this.barrelService.create(this.barrel));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBarrel>>) {
        result.subscribe((res: HttpResponse<IBarrel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMashbillById(index: number, item: IMashbill) {
        return item.id;
    }

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }

    trackBatchById(index: number, item: IBatch) {
        return item.id;
    }
}
