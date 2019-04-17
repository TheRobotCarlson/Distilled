import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductionSchedule } from 'app/shared/model/production-schedule.model';
import { ProductionScheduleService } from './production-schedule.service';

@Component({
    selector: 'jhi-production-schedule-delete-dialog',
    templateUrl: './production-schedule-delete-dialog.component.html'
})
export class ProductionScheduleDeleteDialogComponent {
    productionSchedule: IProductionSchedule;

    constructor(
        protected productionScheduleService: ProductionScheduleService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productionScheduleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productionScheduleListModification',
                content: 'Deleted an productionSchedule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-production-schedule-delete-popup',
    template: ''
})
export class ProductionScheduleDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productionSchedule }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductionScheduleDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productionSchedule = productionSchedule;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/production-schedule', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/production-schedule', { outlets: { popup: null } }]);
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
