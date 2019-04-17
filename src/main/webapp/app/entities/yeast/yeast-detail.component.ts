import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IYeast } from 'app/shared/model/yeast.model';

@Component({
    selector: 'jhi-yeast-detail',
    templateUrl: './yeast-detail.component.html'
})
export class YeastDetailComponent implements OnInit {
    yeast: IYeast;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ yeast }) => {
            this.yeast = yeast;
        });
    }

    previousState() {
        window.history.back();
    }
}
