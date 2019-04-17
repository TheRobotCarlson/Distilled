import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGrain } from 'app/shared/model/grain.model';

@Component({
    selector: 'jhi-grain-detail',
    templateUrl: './grain-detail.component.html'
})
export class GrainDetailComponent implements OnInit {
    grain: IGrain;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ grain }) => {
            this.grain = grain;
        });
    }

    previousState() {
        window.history.back();
    }
}
