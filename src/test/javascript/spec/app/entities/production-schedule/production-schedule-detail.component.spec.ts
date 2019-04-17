/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { ProductionScheduleDetailComponent } from 'app/entities/production-schedule/production-schedule-detail.component';
import { ProductionSchedule } from 'app/shared/model/production-schedule.model';

describe('Component Tests', () => {
    describe('ProductionSchedule Management Detail Component', () => {
        let comp: ProductionScheduleDetailComponent;
        let fixture: ComponentFixture<ProductionScheduleDetailComponent>;
        const route = ({ data: of({ productionSchedule: new ProductionSchedule(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [ProductionScheduleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductionScheduleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductionScheduleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productionSchedule).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
