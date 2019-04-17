import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductionSchedule } from 'app/shared/model/production-schedule.model';
import { AccountService } from 'app/core';
import { ProductionScheduleService } from './production-schedule.service';

@Component({
    selector: 'jhi-production-schedule',
    templateUrl: './production-schedule.component.html'
})
export class ProductionScheduleComponent implements OnInit, OnDestroy {
    productionSchedules: IProductionSchedule[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected productionScheduleService: ProductionScheduleService,
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
            this.productionScheduleService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IProductionSchedule[]>) => res.ok),
                    map((res: HttpResponse<IProductionSchedule[]>) => res.body)
                )
                .subscribe(
                    (res: IProductionSchedule[]) => (this.productionSchedules = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.productionScheduleService
            .query()
            .pipe(
                filter((res: HttpResponse<IProductionSchedule[]>) => res.ok),
                map((res: HttpResponse<IProductionSchedule[]>) => res.body)
            )
            .subscribe(
                (res: IProductionSchedule[]) => {
                    this.productionSchedules = res;
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
        this.registerChangeInProductionSchedules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductionSchedule) {
        return item.id;
    }

    registerChangeInProductionSchedules() {
        this.eventSubscriber = this.eventManager.subscribe('productionScheduleListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
