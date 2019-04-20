/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { BarrelUpdateComponent } from 'app/entities/barrel/barrel-update.component';
import { BarrelService } from 'app/entities/barrel/barrel.service';
import { Barrel } from 'app/shared/model/barrel.model';

describe('Component Tests', () => {
    describe('Barrel Management Update Component', () => {
        let comp: BarrelUpdateComponent;
        let fixture: ComponentFixture<BarrelUpdateComponent>;
        let service: BarrelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [BarrelUpdateComponent]
            })
                .overrideTemplate(BarrelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BarrelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BarrelService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Barrel(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.barrel = entity;
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
                    const entity = new Barrel();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.barrel = entity;
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
