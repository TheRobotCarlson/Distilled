import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IGrain } from 'app/shared/model/grain.model';
import { GrainService } from './grain.service';

@Component({
    selector: 'jhi-grain-update',
    templateUrl: './grain-update.component.html'
})
export class GrainUpdateComponent implements OnInit {
    grain: IGrain;
    isSaving: boolean;

    constructor(protected grainService: GrainService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ grain }) => {
            this.grain = grain;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.grain.id !== undefined) {
            this.subscribeToSaveResponse(this.grainService.update(this.grain));
        } else {
            this.subscribeToSaveResponse(this.grainService.create(this.grain));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrain>>) {
        result.subscribe((res: HttpResponse<IGrain>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
