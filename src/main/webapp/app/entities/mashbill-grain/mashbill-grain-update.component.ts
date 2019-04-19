import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';
import { MashbillGrainService } from './mashbill-grain.service';
import { IGrain } from 'app/shared/model/grain.model';
import { GrainService } from 'app/entities/grain';
import { IMashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from 'app/entities/mashbill';

@Component({
    selector: 'jhi-mashbill-grain-update',
    templateUrl: './mashbill-grain-update.component.html'
})
export class MashbillGrainUpdateComponent implements OnInit {
    mashbillGrain: IMashbillGrain;
    isSaving: boolean;

    grains: IGrain[];

    mashbills: IMashbill[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mashbillGrainService: MashbillGrainService,
        protected grainService: GrainService,
        protected mashbillService: MashbillService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mashbillGrain }) => {
            this.mashbillGrain = mashbillGrain;
        });
        this.grainService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IGrain[]>) => mayBeOk.ok),
                map((response: HttpResponse<IGrain[]>) => response.body)
            )
            .subscribe((res: IGrain[]) => (this.grains = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.mashbillService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMashbill[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMashbill[]>) => response.body)
            )
            .subscribe((res: IMashbill[]) => (this.mashbills = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mashbillGrain.id !== undefined) {
            this.subscribeToSaveResponse(this.mashbillGrainService.update(this.mashbillGrain));
        } else {
            this.subscribeToSaveResponse(this.mashbillGrainService.create(this.mashbillGrain));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMashbillGrain>>) {
        result.subscribe((res: HttpResponse<IMashbillGrain>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGrainById(index: number, item: IGrain) {
        return item.id;
    }

    trackMashbillById(index: number, item: IMashbill) {
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
