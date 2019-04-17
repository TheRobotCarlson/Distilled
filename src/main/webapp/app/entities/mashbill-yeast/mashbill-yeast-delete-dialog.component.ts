import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMashbillYeast } from 'app/shared/model/mashbill-yeast.model';
import { MashbillYeastService } from './mashbill-yeast.service';

@Component({
    selector: 'jhi-mashbill-yeast-delete-dialog',
    templateUrl: './mashbill-yeast-delete-dialog.component.html'
})
export class MashbillYeastDeleteDialogComponent {
    mashbillYeast: IMashbillYeast;

    constructor(
        protected mashbillYeastService: MashbillYeastService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mashbillYeastService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mashbillYeastListModification',
                content: 'Deleted an mashbillYeast'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mashbill-yeast-delete-popup',
    template: ''
})
export class MashbillYeastDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mashbillYeast }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MashbillYeastDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.mashbillYeast = mashbillYeast;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/mashbill-yeast', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/mashbill-yeast', { outlets: { popup: null } }]);
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
