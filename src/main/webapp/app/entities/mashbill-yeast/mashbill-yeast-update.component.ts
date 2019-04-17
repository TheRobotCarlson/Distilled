import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMashbillYeast } from 'app/shared/model/mashbill-yeast.model';
import { MashbillYeastService } from './mashbill-yeast.service';
import { IYeast } from 'app/shared/model/yeast.model';
import { YeastService } from 'app/entities/yeast';
import { IMashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from 'app/entities/mashbill';

@Component({
    selector: 'jhi-mashbill-yeast-update',
    templateUrl: './mashbill-yeast-update.component.html'
})
export class MashbillYeastUpdateComponent implements OnInit {
    mashbillYeast: IMashbillYeast;
    isSaving: boolean;

    yeasts: IYeast[];

    mashbills: IMashbill[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected mashbillYeastService: MashbillYeastService,
        protected yeastService: YeastService,
        protected mashbillService: MashbillService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mashbillYeast }) => {
            this.mashbillYeast = mashbillYeast;
        });
        this.yeastService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IYeast[]>) => mayBeOk.ok),
                map((response: HttpResponse<IYeast[]>) => response.body)
            )
            .subscribe((res: IYeast[]) => (this.yeasts = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.mashbillYeast.id !== undefined) {
            this.subscribeToSaveResponse(this.mashbillYeastService.update(this.mashbillYeast));
        } else {
            this.subscribeToSaveResponse(this.mashbillYeastService.create(this.mashbillYeast));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMashbillYeast>>) {
        result.subscribe((res: HttpResponse<IMashbillYeast>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMashbillById(index: number, item: IMashbill) {
        return item.id;
    }
}
