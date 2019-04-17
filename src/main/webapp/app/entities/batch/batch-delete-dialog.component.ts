import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBatch } from 'app/shared/model/batch.model';
import { BatchService } from './batch.service';

@Component({
    selector: 'jhi-batch-delete-dialog',
    templateUrl: './batch-delete-dialog.component.html'
})
export class BatchDeleteDialogComponent {
    batch: IBatch;

    constructor(protected batchService: BatchService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.batchService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'batchListModification',
                content: 'Deleted an batch'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-batch-delete-popup',
    template: ''
})
export class BatchDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ batch }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BatchDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.batch = batch;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/batch', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/batch', { outlets: { popup: null } }]);
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
