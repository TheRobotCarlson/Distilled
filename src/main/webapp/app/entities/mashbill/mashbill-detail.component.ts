import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMashbill } from 'app/shared/model/mashbill.model';

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
}
