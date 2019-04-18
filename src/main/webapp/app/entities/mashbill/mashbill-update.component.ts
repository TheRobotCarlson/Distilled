import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from './mashbill.service';
import { IMashbillYeast } from 'app/shared/model/mashbill-yeast.model';
import { MashbillYeastService } from 'app/entities/mashbill-yeast';
import { ISpirit } from 'app/shared/model/spirit.model';
import { SpiritService } from 'app/entities/spirit';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-mashbill-update',
    templateUrl: './mashbill-update.component.html'
})
export class MashbillUpdateComponent implements OnInit {
    mashbill: IMashbill;
    isSaving: boolean;

    yeasts: IMashbillYeast[];

    spirits: ISpirit[];

    customers: ICustomer[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mashbillService: MashbillService,
        protected mashbillYeastService: MashbillYeastService,
        protected spiritService: SpiritService,
        protected customerService: CustomerService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mashbill }) => {
            this.mashbill = mashbill;
        });
        this.mashbillYeastService
            .query({ filter: 'mashbill(mashbillcode)-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IMashbillYeast[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMashbillYeast[]>) => response.body)
            )
            .subscribe(
                (res: IMashbillYeast[]) => {
                    if (!this.mashbill.yeastId) {
                        this.yeasts = res;
                    } else {
                        this.mashbillYeastService
                            .find(this.mashbill.yeastId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IMashbillYeast>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IMashbillYeast>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IMashbillYeast) => (this.yeasts = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.spiritService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISpirit[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISpirit[]>) => response.body)
            )
            .subscribe((res: ISpirit[]) => (this.spirits = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.customerService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICustomer[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICustomer[]>) => response.body)
            )
            .subscribe((res: ICustomer[]) => (this.customers = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mashbill.id !== undefined) {
            this.subscribeToSaveResponse(this.mashbillService.update(this.mashbill));
        } else {
            this.subscribeToSaveResponse(this.mashbillService.create(this.mashbill));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMashbill>>) {
        result.subscribe((res: HttpResponse<IMashbill>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMashbillYeastById(index: number, item: IMashbillYeast) {
        return item.id;
    }

    trackSpiritById(index: number, item: ISpirit) {
        return item.id;
    }

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }
}
