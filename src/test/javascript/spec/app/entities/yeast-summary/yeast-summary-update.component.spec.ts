/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { YeastSummaryUpdateComponent } from 'app/entities/yeast-summary/yeast-summary-update.component';
import { YeastSummaryService } from 'app/entities/yeast-summary/yeast-summary.service';
import { YeastSummary } from 'app/shared/model/yeast-summary.model';

describe('Component Tests', () => {
    describe('YeastSummary Management Update Component', () => {
        let comp: YeastSummaryUpdateComponent;
        let fixture: ComponentFixture<YeastSummaryUpdateComponent>;
        let service: YeastSummaryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [YeastSummaryUpdateComponent]
            })
                .overrideTemplate(YeastSummaryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(YeastSummaryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YeastSummaryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new YeastSummary(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.yeastSummary = entity;
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
                    const entity = new YeastSummary();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.yeastSummary = entity;
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
