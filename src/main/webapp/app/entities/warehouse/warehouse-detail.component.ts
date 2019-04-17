import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWarehouse } from 'app/shared/model/warehouse.model';

@Component({
    selector: 'jhi-warehouse-detail',
    templateUrl: './warehouse-detail.component.html'
})
export class WarehouseDetailComponent implements OnInit {
    warehouse: IWarehouse;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ warehouse }) => {
            this.warehouse = warehouse;
        });
    }

    previousState() {
        window.history.back();
    }
}
