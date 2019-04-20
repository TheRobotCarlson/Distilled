/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { ProductionScheduleUpdateComponent } from 'app/entities/production-schedule/production-schedule-update.component';
import { ProductionScheduleService } from 'app/entities/production-schedule/production-schedule.service';
import { ProductionSchedule } from 'app/shared/model/production-schedule.model';

describe('Component Tests', () => {
    describe('ProductionSchedule Management Update Component', () => {
        let comp: ProductionScheduleUpdateComponent;
        let fixture: ComponentFixture<ProductionScheduleUpdateComponent>;
        let service: ProductionScheduleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [ProductionScheduleUpdateComponent]
            })
                .overrideTemplate(ProductionScheduleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductionScheduleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductionScheduleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductionSchedule(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productionSchedule = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductionSchedule();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productionSchedule = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
