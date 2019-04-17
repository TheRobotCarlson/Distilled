import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IYeastSummary } from 'app/shared/model/yeast-summary.model';
import { YeastSummaryService } from './yeast-summary.service';

@Component({
    selector: 'jhi-yeast-summary-delete-dialog',
    templateUrl: './yeast-summary-delete-dialog.component.html'
})
export class YeastSummaryDeleteDialogComponent {
    yeastSummary: IYeastSummary;

    constructor(
        protected yeastSummaryService: YeastSummaryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.yeastSummaryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'yeastSummaryListModification',
                content: 'Deleted an yeastSummary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-yeast-summary-delete-popup',
    template: ''
})
export class YeastSummaryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ yeastSummary }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(YeastSummaryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.yeastSummary = yeastSummary;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/yeast-summary', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/yeast-summary', { outlets: { popup: null } }]);
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
