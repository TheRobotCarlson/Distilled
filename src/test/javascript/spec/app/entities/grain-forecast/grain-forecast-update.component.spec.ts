/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { GrainForecastUpdateComponent } from 'app/entities/grain-forecast/grain-forecast-update.component';
import { GrainForecastService } from 'app/entities/grain-forecast/grain-forecast.service';
import { GrainForecast } from 'app/shared/model/grain-forecast.model';

describe('Component Tests', () => {
    describe('GrainForecast Management Update Component', () => {
        let comp: GrainForecastUpdateComponent;
        let fixture: ComponentFixture<GrainForecastUpdateComponent>;
        let service: GrainForecastService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [GrainForecastUpdateComponent]
            })
                .overrideTemplate(GrainForecastUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GrainForecastUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GrainForecastService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GrainForecast(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.grainForecast = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GrainForecast();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.grainForecast = entity;
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
