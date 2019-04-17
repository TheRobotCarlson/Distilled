import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IGrainForecast } from 'app/shared/model/grain-forecast.model';
import { GrainForecastService } from './grain-forecast.service';

@Component({
    selector: 'jhi-grain-forecast-update',
    templateUrl: './grain-forecast-update.component.html'
})
export class GrainForecastUpdateComponent implements OnInit {
    grainForecast: IGrainForecast;
    isSaving: boolean;

    constructor(protected grainForecastService: GrainForecastService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ grainForecast }) => {
            this.grainForecast = grainForecast;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.grainForecast.id !== undefined) {
            this.subscribeToSaveResponse(this.grainForecastService.update(this.grainForecast));
        } else {
            this.subscribeToSaveResponse(this.grainForecastService.create(this.grainForecast));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrainForecast>>) {
        result.subscribe((res: HttpResponse<IGrainForecast>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
