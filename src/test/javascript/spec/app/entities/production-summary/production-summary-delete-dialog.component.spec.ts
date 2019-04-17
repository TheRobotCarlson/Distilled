/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DistilledTestModule } from '../../../test.module';
import { ProductionSummaryDeleteDialogComponent } from 'app/entities/production-summary/production-summary-delete-dialog.component';
import { ProductionSummaryService } from 'app/entities/production-summary/production-summary.service';

describe('Component Tests', () => {
    describe('ProductionSummary Management Delete Component', () => {
        let comp: ProductionSummaryDeleteDialogComponent;
        let fixture: ComponentFixture<ProductionSummaryDeleteDialogComponent>;
        let service: ProductionSummaryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [ProductionSummaryDeleteDialogComponent]
            })
                .overrideTemplate(ProductionSummaryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductionSummaryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductionSummaryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
