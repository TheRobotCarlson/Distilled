/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DistilledTestModule } from '../../../test.module';
import { MashbillYeastDeleteDialogComponent } from 'app/entities/mashbill-yeast/mashbill-yeast-delete-dialog.component';
import { MashbillYeastService } from 'app/entities/mashbill-yeast/mashbill-yeast.service';

describe('Component Tests', () => {
    describe('MashbillYeast Management Delete Component', () => {
        let comp: MashbillYeastDeleteDialogComponent;
        let fixture: ComponentFixture<MashbillYeastDeleteDialogComponent>;
        let service: MashbillYeastService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MashbillYeastDeleteDialogComponent]
            })
                .overrideTemplate(MashbillYeastDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MashbillYeastDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MashbillYeastService);
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
