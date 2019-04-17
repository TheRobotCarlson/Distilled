/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { MashbillYeastUpdateComponent } from 'app/entities/mashbill-yeast/mashbill-yeast-update.component';
import { MashbillYeastService } from 'app/entities/mashbill-yeast/mashbill-yeast.service';
import { MashbillYeast } from 'app/shared/model/mashbill-yeast.model';

describe('Component Tests', () => {
    describe('MashbillYeast Management Update Component', () => {
        let comp: MashbillYeastUpdateComponent;
        let fixture: ComponentFixture<MashbillYeastUpdateComponent>;
        let service: MashbillYeastService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MashbillYeastUpdateComponent]
            })
                .overrideTemplate(MashbillYeastUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MashbillYeastUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MashbillYeastService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new MashbillYeast(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.mashbillYeast = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new MashbillYeast();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.mashbillYeast = entity;
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
