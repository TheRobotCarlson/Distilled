/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { MashbillGrainDetailComponent } from 'app/entities/mashbill-grain/mashbill-grain-detail.component';
import { MashbillGrain } from 'app/shared/model/mashbill-grain.model';

describe('Component Tests', () => {
    describe('MashbillGrain Management Detail Component', () => {
        let comp: MashbillGrainDetailComponent;
        let fixture: ComponentFixture<MashbillGrainDetailComponent>;
        const route = ({ data: of({ mashbillGrain: new MashbillGrain(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MashbillGrainDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MashbillGrainDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MashbillGrainDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mashbillGrain).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
