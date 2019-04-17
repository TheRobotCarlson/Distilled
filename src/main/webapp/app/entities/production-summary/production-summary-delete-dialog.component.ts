import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductionSummary } from 'app/shared/model/production-summary.model';
import { ProductionSummaryService } from './production-summary.service';

@Component({
    selector: 'jhi-production-summary-delete-dialog',
    templateUrl: './production-summary-delete-dialog.component.html'
})
export class ProductionSummaryDeleteDialogComponent {
    productionSummary: IProductionSummary;

    constructor(
        protected productionSummaryService: ProductionSummaryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productionSummaryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productionSummaryListModification',
                content: 'Deleted an productionSummary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-production-summary-delete-popup',
    template: ''
})
export class ProductionSummaryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productionSummary }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductionSummaryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productionSummary = productionSummary;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/production-summary', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/production-summary', { outlets: { popup: null } }]);
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
