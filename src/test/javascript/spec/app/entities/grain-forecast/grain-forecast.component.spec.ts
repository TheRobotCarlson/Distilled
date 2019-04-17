/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { GrainForecastComponent } from 'app/entities/grain-forecast/grain-forecast.component';
import { GrainForecastService } from 'app/entities/grain-forecast/grain-forecast.service';
import { GrainForecast } from 'app/shared/model/grain-forecast.model';

describe('Component Tests', () => {
    describe('GrainForecast Management Component', () => {
        let comp: GrainForecastComponent;
        let fixture: ComponentFixture<GrainForecastComponent>;
        let service: GrainForecastService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [GrainForecastComponent],
                providers: []
            })
                .overrideTemplate(GrainForecastComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GrainForecastComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GrainForecastService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GrainForecast(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.grainForecasts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
