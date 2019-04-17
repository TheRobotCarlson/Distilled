import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMashbillGrain } from 'app/shared/model/mashbill-grain.model';

@Component({
    selector: 'jhi-mashbill-grain-detail',
    templateUrl: './mashbill-grain-detail.component.html'
})
export class MashbillGrainDetailComponent implements OnInit {
    mashbillGrain: IMashbillGrain;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mashbillGrain }) => {
            this.mashbillGrain = mashbillGrain;
        });
    }

    previousState() {
        window.history.back();
    }
}
