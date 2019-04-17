/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { ProductionScheduleComponent } from 'app/entities/production-schedule/production-schedule.component';
import { ProductionScheduleService } from 'app/entities/production-schedule/production-schedule.service';
import { ProductionSchedule } from 'app/shared/model/production-schedule.model';

describe('Component Tests', () => {
    describe('ProductionSchedule Management Component', () => {
        let comp: ProductionScheduleComponent;
        let fixture: ComponentFixture<ProductionScheduleComponent>;
        let service: ProductionScheduleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [ProductionScheduleComponent],
                providers: []
            })
                .overrideTemplate(ProductionScheduleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductionScheduleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductionScheduleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProductionSchedule(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.productionSchedules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
