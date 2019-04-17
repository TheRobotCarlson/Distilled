import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBarrel } from 'app/shared/model/barrel.model';

@Component({
    selector: 'jhi-barrel-detail',
    templateUrl: './barrel-detail.component.html'
})
export class BarrelDetailComponent implements OnInit {
    barrel: IBarrel;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ barrel }) => {
            this.barrel = barrel;
        });
    }

    previousState() {
        window.history.back();
    }
}
