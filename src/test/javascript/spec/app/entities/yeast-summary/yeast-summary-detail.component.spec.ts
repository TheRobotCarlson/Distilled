/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { YeastSummaryDetailComponent } from 'app/entities/yeast-summary/yeast-summary-detail.component';
import { YeastSummary } from 'app/shared/model/yeast-summary.model';

describe('Component Tests', () => {
    describe('YeastSummary Management Detail Component', () => {
        let comp: YeastSummaryDetailComponent;
        let fixture: ComponentFixture<YeastSummaryDetailComponent>;
        const route = ({ data: of({ yeastSummary: new YeastSummary(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [YeastSummaryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(YeastSummaryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(YeastSummaryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.yeastSummary).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
