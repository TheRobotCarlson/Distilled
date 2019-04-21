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
import { IMashbillGrain, MashbillGrain } from 'app/shared/model/mashbill-grain.model';
import { MashbillGrainService } from 'app/entities/mashbill-grain';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';
import { IGrain } from 'app/shared/model/grain.model';
import { GrainService } from 'app/entities/grain';
import { extendsDirectlyFromObject } from '@angular/core/src/render3/jit/directive';

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

    mbg: IMashbillGrain;

    workingGrains: IMashbillGrain[];

    grains: IGrain[];

    customers: ICustomer[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mashbillService: MashbillService,
        protected yeastService: YeastService,
        protected spiritService: SpiritService,
        protected mashbillGrainService: MashbillGrainService,
        protected customerService: CustomerService,
        protected grainService: GrainService,
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
            .subscribe(
                (res: IMashbillGrain[]) => {
                    this.mashbillgrains = res;
                    if (this.grains !== null && this.grains != null) {
                        this.loadWorkingGrains();
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.grainService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IGrain[]>) => mayBeOk.ok),
                map((response: HttpResponse<IGrain[]>) => response.body)
            )
            .subscribe(
                (res: IGrain[]) => {
                    this.grains = res;
                    if (this.mashbillgrains !== null && this.mashbillgrains !== undefined) {
                        this.loadWorkingGrains();
                    }
                    console.log(this.workingGrains);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.customerService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICustomer[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICustomer[]>) => response.body)
            )
            .subscribe((res: ICustomer[]) => (this.customers = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    mapGrainToMBG(grain: IGrain, index: number) {}

    quantitiesAddTo100() {
        if (this.workingGrains === null || this.workingGrains === undefined) {
            return false;
        }
        let total: number = 0;
        for (let g of this.workingGrains) {
            total = total + g.quantity;
        }
        if (total === 100) {
            return true;
        } else {
            return false;
        }
    }

    previousState() {
        window.history.back();
    }

    loadWorkingGrains() {
        this.workingGrains = this.grains.map((v, i, a) => {
            let ret: IMashbillGrain = new MashbillGrain();
            ret.grainGrainName = v.grainName;
            ret.grainId = v.id;
            ret.quantity = 0;
            if (this.mashbill.id !== null && this.mashbill.id !== undefined) {
                for (let g of this.mashbillgrains) {
                    if (g.grainId === v.id) {
                        console.log('V.ID: ' + v.id);
                        console.log(g);
                        ret.quantity = g.quantity;
                        break;
                    }
                }
            }
            console.log(ret);
            return ret;
        });
    }

    save() {
        this.isSaving = true;
        this.mashbill.grainCounts = [];
        for (let mbg of this.workingGrains) {
            if (mbg.quantity != 0) {
                this.mashbill.grainCounts.push(mbg);
            }
        }
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

    protected mashbillGrainSubscribeToSaveResponse(result: Observable<HttpResponse<IMashbillGrain>>) {
        result.subscribe(
            (res: HttpResponse<IMashbillGrain>) => this.mashbillGrainOnSaveSuccess(),
            (res: HttpErrorResponse) => this.mashbillGrainOnSaveError()
        );
    }

    protected mashbillGrainOnSaveSuccess() {
        console.log('Mashbill Grain saved properly');
    }

    protected mashbillGrainOnSaveError() {
        console.log('Mashbill Grain NOT saved properly');
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
