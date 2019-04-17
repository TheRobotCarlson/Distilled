import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ISpirit } from 'app/shared/model/spirit.model';
import { SpiritService } from './spirit.service';

@Component({
    selector: 'jhi-spirit-update',
    templateUrl: './spirit-update.component.html'
})
export class SpiritUpdateComponent implements OnInit {
    spirit: ISpirit;
    isSaving: boolean;

    constructor(protected spiritService: SpiritService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ spirit }) => {
            this.spirit = spirit;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.spirit.id !== undefined) {
            this.subscribeToSaveResponse(this.spiritService.update(this.spirit));
        } else {
            this.subscribeToSaveResponse(this.spiritService.create(this.spirit));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpirit>>) {
        result.subscribe((res: HttpResponse<ISpirit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
