import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGrain } from 'app/shared/model/grain.model';
import { GrainService } from './grain.service';

@Component({
    selector: 'jhi-grain-delete-dialog',
    templateUrl: './grain-delete-dialog.component.html'
})
export class GrainDeleteDialogComponent {
    grain: IGrain;

    constructor(protected grainService: GrainService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.grainService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'grainListModification',
                content: 'Deleted an grain'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-grain-delete-popup',
    template: ''
})
export class GrainDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ grain }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GrainDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.grain = grain;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/grain', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/grain', { outlets: { popup: null } }]);
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
