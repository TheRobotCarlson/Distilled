/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { WarehouseUpdateComponent } from 'app/entities/warehouse/warehouse-update.component';
import { WarehouseService } from 'app/entities/warehouse/warehouse.service';
import { Warehouse } from 'app/shared/model/warehouse.model';

describe('Component Tests', () => {
    describe('Warehouse Management Update Component', () => {
        let comp: WarehouseUpdateComponent;
        let fixture: ComponentFixture<WarehouseUpdateComponent>;
        let service: WarehouseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [WarehouseUpdateComponent]
            })
                .overrideTemplate(WarehouseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WarehouseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Warehouse(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.warehouse = entity;
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
                    const entity = new Warehouse();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.warehouse = entity;
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
