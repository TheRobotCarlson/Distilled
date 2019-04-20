/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { MashbillGrainUpdateComponent } from 'app/entities/mashbill-grain/mashbill-grain-update.component';
import { MashbillGrainService } from 'app/entities/mashbill-grain/mashbill-grain.service';
import { MashbillGrain } from 'app/shared/model/mashbill-grain.model';

describe('Component Tests', () => {
    describe('MashbillGrain Management Update Component', () => {
        let comp: MashbillGrainUpdateComponent;
        let fixture: ComponentFixture<MashbillGrainUpdateComponent>;
        let service: MashbillGrainService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MashbillGrainUpdateComponent]
            })
                .overrideTemplate(MashbillGrainUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MashbillGrainUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MashbillGrainService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MashbillGrain(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mashbillGrain = entity;
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
                    const entity = new MashbillGrain();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mashbillGrain = entity;
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
