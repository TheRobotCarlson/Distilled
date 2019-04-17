/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { MasterSummaryDetailComponent } from 'app/entities/master-summary/master-summary-detail.component';
import { MasterSummary } from 'app/shared/model/master-summary.model';

describe('Component Tests', () => {
    describe('MasterSummary Management Detail Component', () => {
        let comp: MasterSummaryDetailComponent;
        let fixture: ComponentFixture<MasterSummaryDetailComponent>;
        const route = ({ data: of({ masterSummary: new MasterSummary(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MasterSummaryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MasterSummaryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MasterSummaryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.masterSummary).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
