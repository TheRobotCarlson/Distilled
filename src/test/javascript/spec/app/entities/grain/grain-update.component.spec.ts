/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { GrainUpdateComponent } from 'app/entities/grain/grain-update.component';
import { GrainService } from 'app/entities/grain/grain.service';
import { Grain } from 'app/shared/model/grain.model';

describe('Component Tests', () => {
    describe('Grain Management Update Component', () => {
        let comp: GrainUpdateComponent;
        let fixture: ComponentFixture<GrainUpdateComponent>;
        let service: GrainService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [GrainUpdateComponent]
            })
                .overrideTemplate(GrainUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GrainUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GrainService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Grain(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.grain = entity;
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
                    const entity = new Grain();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.grain = entity;
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
