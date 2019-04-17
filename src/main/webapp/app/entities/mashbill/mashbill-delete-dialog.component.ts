import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMashbill } from 'app/shared/model/mashbill.model';
import { MashbillService } from './mashbill.service';

@Component({
    selector: 'jhi-mashbill-delete-dialog',
    templateUrl: './mashbill-delete-dialog.component.html'
})
export class MashbillDeleteDialogComponent {
    mashbill: IMashbill;

    constructor(protected mashbillService: MashbillService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mashbillService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mashbillListModification',
                content: 'Deleted an mashbill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mashbill-delete-popup',
    template: ''
})
export class MashbillDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mashbill }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MashbillDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.mashbill = mashbill;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/mashbill', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/mashbill', { outlets: { popup: null } }]);
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
