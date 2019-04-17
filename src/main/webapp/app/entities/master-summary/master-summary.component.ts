import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMasterSummary } from 'app/shared/model/master-summary.model';
import { AccountService } from 'app/core';
import { MasterSummaryService } from './master-summary.service';

@Component({
    selector: 'jhi-master-summary',
    templateUrl: './master-summary.component.html'
})
export class MasterSummaryComponent implements OnInit, OnDestroy {
    masterSummaries: IMasterSummary[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected masterSummaryService: MasterSummaryService,
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
            this.masterSummaryService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IMasterSummary[]>) => res.ok),
                    map((res: HttpResponse<IMasterSummary[]>) => res.body)
                )
                .subscribe((res: IMasterSummary[]) => (this.masterSummaries = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.masterSummaryService
            .query()
            .pipe(
                filter((res: HttpResponse<IMasterSummary[]>) => res.ok),
                map((res: HttpResponse<IMasterSummary[]>) => res.body)
            )
            .subscribe(
                (res: IMasterSummary[]) => {
                    this.masterSummaries = res;
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
        this.registerChangeInMasterSummaries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMasterSummary) {
        return item.id;
    }

    registerChangeInMasterSummaries() {
        this.eventSubscriber = this.eventManager.subscribe('masterSummaryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
