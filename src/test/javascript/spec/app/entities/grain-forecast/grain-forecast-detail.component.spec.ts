/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { GrainForecastDetailComponent } from 'app/entities/grain-forecast/grain-forecast-detail.component';
import { GrainForecast } from 'app/shared/model/grain-forecast.model';

describe('Component Tests', () => {
    describe('GrainForecast Management Detail Component', () => {
        let comp: GrainForecastDetailComponent;
        let fixture: ComponentFixture<GrainForecastDetailComponent>;
        const route = ({ data: of({ grainForecast: new GrainForecast(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [GrainForecastDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GrainForecastDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GrainForecastDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.grainForecast).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
