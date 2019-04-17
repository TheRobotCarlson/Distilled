/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { ProductionSummaryDetailComponent } from 'app/entities/production-summary/production-summary-detail.component';
import { ProductionSummary } from 'app/shared/model/production-summary.model';

describe('Component Tests', () => {
    describe('ProductionSummary Management Detail Component', () => {
        let comp: ProductionSummaryDetailComponent;
        let fixture: ComponentFixture<ProductionSummaryDetailComponent>;
        const route = ({ data: of({ productionSummary: new ProductionSummary(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [ProductionSummaryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductionSummaryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductionSummaryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productionSummary).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
