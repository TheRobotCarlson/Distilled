import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IYeastSummary } from 'app/shared/model/yeast-summary.model';
import { YeastSummaryService } from './yeast-summary.service';

@Component({
    selector: 'jhi-yeast-summary-update',
    templateUrl: './yeast-summary-update.component.html'
})
export class YeastSummaryUpdateComponent implements OnInit {
    yeastSummary: IYeastSummary;
    isSaving: boolean;

    constructor(protected yeastSummaryService: YeastSummaryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ yeastSummary }) => {
            this.yeastSummary = yeastSummary;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.yeastSummary.id !== undefined) {
            this.subscribeToSaveResponse(this.yeastSummaryService.update(this.yeastSummary));
        } else {
            this.subscribeToSaveResponse(this.yeastSummaryService.create(this.yeastSummary));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IYeastSummary>>) {
        result.subscribe((res: HttpResponse<IYeastSummary>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
