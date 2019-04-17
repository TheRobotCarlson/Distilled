/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { MashbillDetailComponent } from 'app/entities/mashbill/mashbill-detail.component';
import { Mashbill } from 'app/shared/model/mashbill.model';

describe('Component Tests', () => {
    describe('Mashbill Management Detail Component', () => {
        let comp: MashbillDetailComponent;
        let fixture: ComponentFixture<MashbillDetailComponent>;
        const route = ({ data: of({ mashbill: new Mashbill(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MashbillDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MashbillDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MashbillDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mashbill).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
