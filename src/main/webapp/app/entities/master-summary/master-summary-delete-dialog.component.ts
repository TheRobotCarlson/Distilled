import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMasterSummary } from 'app/shared/model/master-summary.model';
import { MasterSummaryService } from './master-summary.service';

@Component({
    selector: 'jhi-master-summary-delete-dialog',
    templateUrl: './master-summary-delete-dialog.component.html'
})
export class MasterSummaryDeleteDialogComponent {
    masterSummary: IMasterSummary;

    constructor(
        protected masterSummaryService: MasterSummaryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.masterSummaryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'masterSummaryListModification',
                content: 'Deleted an masterSummary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-master-summary-delete-popup',
    template: ''
})
export class MasterSummaryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ masterSummary }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MasterSummaryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.masterSummary = masterSummary;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/master-summary', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/master-summary', { outlets: { popup: null } }]);
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
