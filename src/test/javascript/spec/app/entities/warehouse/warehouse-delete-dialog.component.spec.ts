/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DistilledTestModule } from '../../../test.module';
import { WarehouseDeleteDialogComponent } from 'app/entities/warehouse/warehouse-delete-dialog.component';
import { WarehouseService } from 'app/entities/warehouse/warehouse.service';

describe('Component Tests', () => {
    describe('Warehouse Management Delete Component', () => {
        let comp: WarehouseDeleteDialogComponent;
        let fixture: ComponentFixture<WarehouseDeleteDialogComponent>;
        let service: WarehouseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [WarehouseDeleteDialogComponent]
            })
                .overrideTemplate(WarehouseDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WarehouseDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseService);
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
