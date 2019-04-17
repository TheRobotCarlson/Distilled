/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { BatchUpdateComponent } from 'app/entities/batch/batch-update.component';
import { BatchService } from 'app/entities/batch/batch.service';
import { Batch } from 'app/shared/model/batch.model';

describe('Component Tests', () => {
    describe('Batch Management Update Component', () => {
        let comp: BatchUpdateComponent;
        let fixture: ComponentFixture<BatchUpdateComponent>;
        let service: BatchService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [BatchUpdateComponent]
            })
                .overrideTemplate(BatchUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BatchUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BatchService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Batch(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.batch = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Batch();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.batch = entity;
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
