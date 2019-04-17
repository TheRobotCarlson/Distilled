import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGrainForecast } from 'app/shared/model/grain-forecast.model';

@Component({
    selector: 'jhi-grain-forecast-detail',
    templateUrl: './grain-forecast-detail.component.html'
})
export class GrainForecastDetailComponent implements OnInit {
    grainForecast: IGrainForecast;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ grainForecast }) => {
            this.grainForecast = grainForecast;
        });
    }

    previousState() {
        window.history.back();
    }
}
