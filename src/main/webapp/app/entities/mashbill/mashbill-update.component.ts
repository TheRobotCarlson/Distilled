import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from './mashbill.service';
import { IYeast } from 'app/shared/model/yeast.model';
import { YeastService } from 'app/entities/yeast';
import { ISpirit } from 'app/shared/model/spirit.model';
import { SpiritService } from 'app/entities/spirit';
import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';
import { MashbillGrainService } from 'app/entities/mashbill-grain';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-mashbill-update',
    templateUrl: './mashbill-update.component.html'
})
export class MashbillUpdateComponent implements OnInit {
    mashbill: IMashbill;
    isSaving: boolean;

    yeasts: IYeast[];

    spirits: ISpirit[];

    mashbillgrains: IMashbillGrain[];

    customers: ICustomer[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mashbillService: MashbillService,
        protected yeastService: YeastService,
        protected spiritService: SpiritService,
        protected mashbillGrainService: MashbillGrainService,
        protected customerService: CustomerService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mashbill }) => {
            this.mashbill = mashbill;
        });
        this.yeastService
            .query({ filter: 'mashbill-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IYeast[]>) => mayBeOk.ok),
                map((response: HttpResponse<IYeast[]>) => response.body)
            )
            .subscribe(
                (res: IYeast[]) => {
                    if (!this.mashbill.yeastId) {
                        this.yeasts = res;
                    } else {
                        this.yeastService
                            .find(this.mashbill.yeastId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IYeast>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IYeast>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IYeast) => (this.yeasts = [subRes].concat(res)),
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
        this.mashbillGrainService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMashbillGrain[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMashbillGrain[]>) => response.body)
            )
            .subscribe((res: IMashbillGrain[]) => (this.mashbillgrains = res), (res: HttpErrorResponse) => this.onError(res.message));
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

    trackYeastById(index: number, item: IYeast) {
        return item.id;
    }

    trackSpiritById(index: number, item: ISpirit) {
        return item.id;
    }

    trackMashbillGrainById(index: number, item: IMashbillGrain) {
        return item.id;
    }

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
