/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { YeastUpdateComponent } from 'app/entities/yeast/yeast-update.component';
import { YeastService } from 'app/entities/yeast/yeast.service';
import { Yeast } from 'app/shared/model/yeast.model';

describe('Component Tests', () => {
    describe('Yeast Management Update Component', () => {
        let comp: YeastUpdateComponent;
        let fixture: ComponentFixture<YeastUpdateComponent>;
        let service: YeastService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [YeastUpdateComponent]
            })
                .overrideTemplate(YeastUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(YeastUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YeastService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Yeast(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.yeast = entity;
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
                    const entity = new Yeast();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.yeast = entity;
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
