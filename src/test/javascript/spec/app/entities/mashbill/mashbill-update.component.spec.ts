/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { MashbillUpdateComponent } from 'app/entities/mashbill/mashbill-update.component';
import { MashbillService } from 'app/entities/mashbill/mashbill.service';
import { Mashbill } from 'app/shared/model/mashbill.model';

describe('Component Tests', () => {
    describe('Mashbill Management Update Component', () => {
        let comp: MashbillUpdateComponent;
        let fixture: ComponentFixture<MashbillUpdateComponent>;
        let service: MashbillService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MashbillUpdateComponent]
            })
                .overrideTemplate(MashbillUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MashbillUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MashbillService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Mashbill(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mashbill = entity;
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
                    const entity = new Mashbill();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mashbill = entity;
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
