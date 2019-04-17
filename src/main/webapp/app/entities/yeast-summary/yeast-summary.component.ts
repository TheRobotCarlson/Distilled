import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IYeastSummary } from 'app/shared/model/yeast-summary.model';
import { AccountService } from 'app/core';
import { YeastSummaryService } from './yeast-summary.service';

@Component({
    selector: 'jhi-yeast-summary',
    templateUrl: './yeast-summary.component.html'
})
export class YeastSummaryComponent implements OnInit, OnDestroy {
    yeastSummaries: IYeastSummary[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected yeastSummaryService: YeastSummaryService,
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
            this.yeastSummaryService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IYeastSummary[]>) => res.ok),
                    map((res: HttpResponse<IYeastSummary[]>) => res.body)
                )
                .subscribe((res: IYeastSummary[]) => (this.yeastSummaries = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.yeastSummaryService
            .query()
            .pipe(
                filter((res: HttpResponse<IYeastSummary[]>) => res.ok),
                map((res: HttpResponse<IYeastSummary[]>) => res.body)
            )
            .subscribe(
                (res: IYeastSummary[]) => {
                    this.yeastSummaries = res;
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
        this.registerChangeInYeastSummaries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IYeastSummary) {
        return item.id;
    }

    registerChangeInYeastSummaries() {
        this.eventSubscriber = this.eventManager.subscribe('yeastSummaryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
