import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMashbill } from 'app/shared/model/mashbill.model';
import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';

@Component({
    selector: 'jhi-mashbill-detail',
    templateUrl: './mashbill-detail.component.html'
})
export class MashbillDetailComponent implements OnInit {
    mashbill: IMashbill;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mashbill }) => {
            this.mashbill = mashbill;
        });
    }

    previousState() {
        window.history.back();
    }

    trackMashbillGrainById(item: IMashbillGrain, index: number) {
        return item.id;
    }
}
