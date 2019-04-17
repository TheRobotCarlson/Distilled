import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpirit } from 'app/shared/model/spirit.model';
import { SpiritService } from './spirit.service';

@Component({
    selector: 'jhi-spirit-delete-dialog',
    templateUrl: './spirit-delete-dialog.component.html'
})
export class SpiritDeleteDialogComponent {
    spirit: ISpirit;

    constructor(protected spiritService: SpiritService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.spiritService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'spiritListModification',
                content: 'Deleted an spirit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-spirit-delete-popup',
    template: ''
})
export class SpiritDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ spirit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SpiritDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.spirit = spirit;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/spirit', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/spirit', { outlets: { popup: null } }]);
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
