/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { MasterSummaryUpdateComponent } from 'app/entities/master-summary/master-summary-update.component';
import { MasterSummaryService } from 'app/entities/master-summary/master-summary.service';
import { MasterSummary } from 'app/shared/model/master-summary.model';

describe('Component Tests', () => {
    describe('MasterSummary Management Update Component', () => {
        let comp: MasterSummaryUpdateComponent;
        let fixture: ComponentFixture<MasterSummaryUpdateComponent>;
        let service: MasterSummaryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MasterSummaryUpdateComponent]
            })
                .overrideTemplate(MasterSummaryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MasterSummaryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MasterSummaryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MasterSummary(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.masterSummary = entity;
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
                    const entity = new MasterSummary();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.masterSummary = entity;
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
