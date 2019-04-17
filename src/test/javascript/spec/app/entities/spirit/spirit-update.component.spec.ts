/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { SpiritUpdateComponent } from 'app/entities/spirit/spirit-update.component';
import { SpiritService } from 'app/entities/spirit/spirit.service';
import { Spirit } from 'app/shared/model/spirit.model';

describe('Component Tests', () => {
    describe('Spirit Management Update Component', () => {
        let comp: SpiritUpdateComponent;
        let fixture: ComponentFixture<SpiritUpdateComponent>;
        let service: SpiritService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [SpiritUpdateComponent]
            })
                .overrideTemplate(SpiritUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SpiritUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpiritService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Spirit(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.spirit = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Spirit();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.spirit = entity;
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
