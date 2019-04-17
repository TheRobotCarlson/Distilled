import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGrainForecast } from 'app/shared/model/grain-forecast.model';
import { AccountService } from 'app/core';
import { GrainForecastService } from './grain-forecast.service';

@Component({
    selector: 'jhi-grain-forecast',
    templateUrl: './grain-forecast.component.html'
})
export class GrainForecastComponent implements OnInit, OnDestroy {
    grainForecasts: IGrainForecast[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected grainForecastService: GrainForecastService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.grainForecastService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IGrainForecast[]>) => res.ok),
                    map((res: HttpResponse<IGrainForecast[]>) => res.body)
                )
                .subscribe((res: IGrainForecast[]) => (this.grainForecasts = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.grainForecastService
            .query()
            .pipe(
                filter((res: HttpResponse<IGrainForecast[]>) => res.ok),
                map((res: HttpResponse<IGrainForecast[]>) => res.body)
            )
            .subscribe(
                (res: IGrainForecast[]) => {
                    this.grainForecasts = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGrainForecasts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGrainForecast) {
        return item.id;
    }

    registerChangeInGrainForecasts() {
        this.eventSubscriber = this.eventManager.subscribe('grainForecastListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
