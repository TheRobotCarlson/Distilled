import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpirit } from 'app/shared/model/spirit.model';

@Component({
    selector: 'jhi-spirit-detail',
    templateUrl: './spirit-detail.component.html'
})
export class SpiritDetailComponent implements OnInit {
    spirit: ISpirit;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ spirit }) => {
            this.spirit = spirit;
        });
    }

    previousState() {
        window.history.back();
    }
}
