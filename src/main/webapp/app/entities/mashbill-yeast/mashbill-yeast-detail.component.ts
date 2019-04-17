import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMashbillYeast } from 'app/shared/model/mashbill-yeast.model';

@Component({
    selector: 'jhi-mashbill-yeast-detail',
    templateUrl: './mashbill-yeast-detail.component.html'
})
export class MashbillYeastDetailComponent implements OnInit {
    mashbillYeast: IMashbillYeast;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mashbillYeast }) => {
            this.mashbillYeast = mashbillYeast;
        });
    }

    previousState() {
        window.history.back();
    }
}
