/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DistilledTestModule } from '../../../test.module';
import { GrainForecastDeleteDialogComponent } from 'app/entities/grain-forecast/grain-forecast-delete-dialog.component';
import { GrainForecastService } from 'app/entities/grain-forecast/grain-forecast.service';

describe('Component Tests', () => {
    describe('GrainForecast Management Delete Component', () => {
        let comp: GrainForecastDeleteDialogComponent;
        let fixture: ComponentFixture<GrainForecastDeleteDialogComponent>;
        let service: GrainForecastService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [GrainForecastDeleteDialogComponent]
            })
                .overrideTemplate(GrainForecastDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GrainForecastDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GrainForecastService);
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
