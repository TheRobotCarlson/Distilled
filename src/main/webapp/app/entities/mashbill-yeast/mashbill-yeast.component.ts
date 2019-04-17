import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMashbillYeast } from 'app/shared/model/mashbill-yeast.model';
import { AccountService } from 'app/core';
import { MashbillYeastService } from './mashbill-yeast.service';

@Component({
    selector: 'jhi-mashbill-yeast',
    templateUrl: './mashbill-yeast.component.html'
})
export class MashbillYeastComponent implements OnInit, OnDestroy {
    mashbillYeasts: IMashbillYeast[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected mashbillYeastService: MashbillYeastService,
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
            this.mashbillYeastService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IMashbillYeast[]>) => res.ok),
                    map((res: HttpResponse<IMashbillYeast[]>) => res.body)
                )
                .subscribe((res: IMashbillYeast[]) => (this.mashbillYeasts = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.mashbillYeastService
            .query()
            .pipe(
                filter((res: HttpResponse<IMashbillYeast[]>) => res.ok),
                map((res: HttpResponse<IMashbillYeast[]>) => res.body)
            )
            .subscribe(
                (res: IMashbillYeast[]) => {
                    this.mashbillYeasts = res;
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
        this.registerChangeInMashbillYeasts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMashbillYeast) {
        return item.id;
    }

    registerChangeInMashbillYeasts() {
        this.eventSubscriber = this.eventManager.subscribe('mashbillYeastListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
