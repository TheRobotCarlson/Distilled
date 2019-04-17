/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { MashbillYeastDetailComponent } from 'app/entities/mashbill-yeast/mashbill-yeast-detail.component';
import { MashbillYeast } from 'app/shared/model/mashbill-yeast.model';

describe('Component Tests', () => {
    describe('MashbillYeast Management Detail Component', () => {
        let comp: MashbillYeastDetailComponent;
        let fixture: ComponentFixture<MashbillYeastDetailComponent>;
        const route = ({ data: of({ mashbillYeast: new MashbillYeast(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MashbillYeastDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MashbillYeastDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MashbillYeastDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mashbillYeast).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
