/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { ProductionSummaryComponent } from 'app/entities/production-summary/production-summary.component';
import { ProductionSummaryService } from 'app/entities/production-summary/production-summary.service';
import { ProductionSummary } from 'app/shared/model/production-summary.model';

describe('Component Tests', () => {
    describe('ProductionSummary Management Component', () => {
        let comp: ProductionSummaryComponent;
        let fixture: ComponentFixture<ProductionSummaryComponent>;
        let service: ProductionSummaryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [ProductionSummaryComponent],
                providers: []
            })
                .overrideTemplate(ProductionSummaryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductionSummaryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductionSummaryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProductionSummary(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.productionSummaries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
