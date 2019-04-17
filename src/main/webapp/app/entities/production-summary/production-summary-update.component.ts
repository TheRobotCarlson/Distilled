import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IProductionSummary } from 'app/shared/model/production-summary.model';
import { ProductionSummaryService } from './production-summary.service';

@Component({
    selector: 'jhi-production-summary-update',
    templateUrl: './production-summary-update.component.html'
})
export class ProductionSummaryUpdateComponent implements OnInit {
    productionSummary: IProductionSummary;
    isSaving: boolean;

    constructor(protected productionSummaryService: ProductionSummaryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productionSummary }) => {
            this.productionSummary = productionSummary;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productionSummary.id !== undefined) {
            this.subscribeToSaveResponse(this.productionSummaryService.update(this.productionSummary));
        } else {
            this.subscribeToSaveResponse(this.productionSummaryService.create(this.productionSummary));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductionSummary>>) {
        result.subscribe((res: HttpResponse<IProductionSummary>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
