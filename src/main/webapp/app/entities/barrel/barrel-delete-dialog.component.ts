import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBarrel } from 'app/shared/model/barrel.model';
import { BarrelService } from './barrel.service';

@Component({
    selector: 'jhi-barrel-delete-dialog',
    templateUrl: './barrel-delete-dialog.component.html'
})
export class BarrelDeleteDialogComponent {
    barrel: IBarrel;

    constructor(protected barrelService: BarrelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.barrelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'barrelListModification',
                content: 'Deleted an barrel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-barrel-delete-popup',
    template: ''
})
export class BarrelDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ barrel }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BarrelDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.barrel = barrel;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/barrel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/barrel', { outlets: { popup: null } }]);
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
