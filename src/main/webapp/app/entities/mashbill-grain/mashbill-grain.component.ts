import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';
import { AccountService } from 'app/core';
import { MashbillGrainService } from './mashbill-grain.service';

@Component({
    selector: 'jhi-mashbill-grain',
    templateUrl: './mashbill-grain.component.html'
})
export class MashbillGrainComponent implements OnInit, OnDestroy {
    mashbillGrains: IMashbillGrain[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected mashbillGrainService: MashbillGrainService,
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
            this.mashbillGrainService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IMashbillGrain[]>) => res.ok),
                    map((res: HttpResponse<IMashbillGrain[]>) => res.body)
                )
                .subscribe((res: IMashbillGrain[]) => (this.mashbillGrains = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.mashbillGrainService
            .query()
            .pipe(
                filter((res: HttpResponse<IMashbillGrain[]>) => res.ok),
                map((res: HttpResponse<IMashbillGrain[]>) => res.body)
            )
            .subscribe(
                (res: IMashbillGrain[]) => {
                    this.mashbillGrains = res;
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
        this.registerChangeInMashbillGrains();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMashbillGrain) {
        return item.id;
    }

    registerChangeInMashbillGrains() {
        this.eventSubscriber = this.eventManager.subscribe('mashbillGrainListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
