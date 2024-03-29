import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductionSummary } from 'app/shared/model/production-summary.model';
import { AccountService } from 'app/core';
import { ProductionSummaryService } from './production-summary.service';

@Component({
    selector: 'jhi-production-summary',
    templateUrl: './production-summary.component.html'
})
export class ProductionSummaryComponent implements OnInit, OnDestroy {
    productionSummaries: IProductionSummary[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected productionSummaryService: ProductionSummaryService,
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
            this.productionSummaryService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IProductionSummary[]>) => res.ok),
                    map((res: HttpResponse<IProductionSummary[]>) => res.body)
                )
                .subscribe(
                    (res: IProductionSummary[]) => (this.productionSummaries = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.productionSummaryService
            .query()
            .pipe(
                filter((res: HttpResponse<IProductionSummary[]>) => res.ok),
                map((res: HttpResponse<IProductionSummary[]>) => res.body)
            )
            .subscribe(
                (res: IProductionSummary[]) => {
                    this.productionSummaries = res;
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
        this.registerChangeInProductionSummaries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductionSummary) {
        return item.id;
    }

    registerChangeInProductionSummaries() {
        this.eventSubscriber = this.eventManager.subscribe('productionSummaryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
