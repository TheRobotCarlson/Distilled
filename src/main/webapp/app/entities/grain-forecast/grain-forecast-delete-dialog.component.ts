import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGrainForecast } from 'app/shared/model/grain-forecast.model';
import { GrainForecastService } from './grain-forecast.service';

@Component({
    selector: 'jhi-grain-forecast-delete-dialog',
    templateUrl: './grain-forecast-delete-dialog.component.html'
})
export class GrainForecastDeleteDialogComponent {
    grainForecast: IGrainForecast;

    constructor(
        protected grainForecastService: GrainForecastService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.grainForecastService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'grainForecastListModification',
                content: 'Deleted an grainForecast'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-grain-forecast-delete-popup',
    template: ''
})
export class GrainForecastDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ grainForecast }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GrainForecastDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.grainForecast = grainForecast;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/grain-forecast', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/grain-forecast', { outlets: { popup: null } }]);
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
