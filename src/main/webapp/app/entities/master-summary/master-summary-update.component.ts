import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMasterSummary } from 'app/shared/model/master-summary.model';
import { MasterSummaryService } from './master-summary.service';

@Component({
    selector: 'jhi-master-summary-update',
    templateUrl: './master-summary-update.component.html'
})
export class MasterSummaryUpdateComponent implements OnInit {
    masterSummary: IMasterSummary;
    isSaving: boolean;

    constructor(protected masterSummaryService: MasterSummaryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ masterSummary }) => {
            this.masterSummary = masterSummary;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.masterSummary.id !== undefined) {
            this.subscribeToSaveResponse(this.masterSummaryService.update(this.masterSummary));
        } else {
            this.subscribeToSaveResponse(this.masterSummaryService.create(this.masterSummary));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMasterSummary>>) {
        result.subscribe((res: HttpResponse<IMasterSummary>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
