/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DistilledTestModule } from '../../../test.module';
import { BarrelDeleteDialogComponent } from 'app/entities/barrel/barrel-delete-dialog.component';
import { BarrelService } from 'app/entities/barrel/barrel.service';

describe('Component Tests', () => {
    describe('Barrel Management Delete Component', () => {
        let comp: BarrelDeleteDialogComponent;
        let fixture: ComponentFixture<BarrelDeleteDialogComponent>;
        let service: BarrelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [BarrelDeleteDialogComponent]
            })
                .overrideTemplate(BarrelDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BarrelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BarrelService);
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
