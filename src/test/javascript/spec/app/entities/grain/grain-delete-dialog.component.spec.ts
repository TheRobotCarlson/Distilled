/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DistilledTestModule } from '../../../test.module';
import { GrainDeleteDialogComponent } from 'app/entities/grain/grain-delete-dialog.component';
import { GrainService } from 'app/entities/grain/grain.service';

describe('Component Tests', () => {
    describe('Grain Management Delete Component', () => {
        let comp: GrainDeleteDialogComponent;
        let fixture: ComponentFixture<GrainDeleteDialogComponent>;
        let service: GrainService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [GrainDeleteDialogComponent]
            })
                .overrideTemplate(GrainDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GrainDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GrainService);
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
