import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWarehouse } from 'app/shared/model/warehouse.model';
import { WarehouseService } from './warehouse.service';

@Component({
    selector: 'jhi-warehouse-delete-dialog',
    templateUrl: './warehouse-delete-dialog.component.html'
})
export class WarehouseDeleteDialogComponent {
    warehouse: IWarehouse;

    constructor(
        protected warehouseService: WarehouseService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.warehouseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'warehouseListModification',
                content: 'Deleted an warehouse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-warehouse-delete-popup',
    template: ''
})
export class WarehouseDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ warehouse }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WarehouseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.warehouse = warehouse;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/warehouse', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/warehouse', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
