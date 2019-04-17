/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DistilledTestModule } from '../../../test.module';
import { ProductionScheduleDeleteDialogComponent } from 'app/entities/production-schedule/production-schedule-delete-dialog.component';
import { ProductionScheduleService } from 'app/entities/production-schedule/production-schedule.service';

describe('Component Tests', () => {
    describe('ProductionSchedule Management Delete Component', () => {
        let comp: ProductionScheduleDeleteDialogComponent;
        let fixture: ComponentFixture<ProductionScheduleDeleteDialogComponent>;
        let service: ProductionScheduleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [ProductionScheduleDeleteDialogComponent]
            })
                .overrideTemplate(ProductionScheduleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductionScheduleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductionScheduleService);
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
