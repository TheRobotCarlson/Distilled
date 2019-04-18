import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { filter, map } from 'rxjs/operators';

import { IMashbill } from 'app/shared/model/mashbill.model';
import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';
import { MashbillGrainService } from '../mashbill-grain';

@Component({
    selector: 'jhi-mashbill-detail',
    templateUrl: './mashbill-detail.component.html'
})
export class MashbillDetailComponent implements OnInit {
    mashbill: IMashbill;
    grains: IMashbillGrain[];

    constructor(protected activatedRoute: ActivatedRoute, private grainService: MashbillGrainService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mashbill }) => {
            this.mashbill = mashbill;
        });
        this.loadAllGrains();
    }

    loadAllGrains() {
        // //.subscribe(
        //     (res: IMashbillGrain[]) => {
        //         this.mashbillGrains = res;
        //         this.currentSearch = '';
        //     },
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
        // //
        this.grainService.queryByOwner(this.mashbill.id).subscribe(resp => {
            console.log(resp);
            this.grains = resp;
        });
    }

    previousState() {
        window.history.back();
    }

    onError(msg: any) {
        console.log(msg);
    }

    trackId(item: any) {
        return item.id;
    }
}
