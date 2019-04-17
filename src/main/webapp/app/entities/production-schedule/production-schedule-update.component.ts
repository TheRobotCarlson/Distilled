import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IProductionSchedule } from 'app/shared/model/production-schedule.model';
import { ProductionScheduleService } from './production-schedule.service';

@Component({
    selector: 'jhi-production-schedule-update',
    templateUrl: './production-schedule-update.component.html'
})
export class ProductionScheduleUpdateComponent implements OnInit {
    productionSchedule: IProductionSchedule;
    isSaving: boolean;

    constructor(protected productionScheduleService: ProductionScheduleService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productionSchedule }) => {
            this.productionSchedule = productionSchedule;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productionSchedule.id !== undefined) {
            this.subscribeToSaveResponse(this.productionScheduleService.update(this.productionSchedule));
        } else {
            this.subscribeToSaveResponse(this.productionScheduleService.create(this.productionSchedule));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductionSchedule>>) {
        result.subscribe((res: HttpResponse<IProductionSchedule>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
