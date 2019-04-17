/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { WarehouseDetailComponent } from 'app/entities/warehouse/warehouse-detail.component';
import { Warehouse } from 'app/shared/model/warehouse.model';

describe('Component Tests', () => {
    describe('Warehouse Management Detail Component', () => {
        let comp: WarehouseDetailComponent;
        let fixture: ComponentFixture<WarehouseDetailComponent>;
        const route = ({ data: of({ warehouse: new Warehouse(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [WarehouseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WarehouseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WarehouseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.warehouse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
