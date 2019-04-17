/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { ProductionSummaryUpdateComponent } from 'app/entities/production-summary/production-summary-update.component';
import { ProductionSummaryService } from 'app/entities/production-summary/production-summary.service';
import { ProductionSummary } from 'app/shared/model/production-summary.model';

describe('Component Tests', () => {
    describe('ProductionSummary Management Update Component', () => {
        let comp: ProductionSummaryUpdateComponent;
        let fixture: ComponentFixture<ProductionSummaryUpdateComponent>;
        let service: ProductionSummaryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [ProductionSummaryUpdateComponent]
            })
                .overrideTemplate(ProductionSummaryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductionSummaryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductionSummaryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductionSummary(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productionSummary = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductionSummary();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productionSummary = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
