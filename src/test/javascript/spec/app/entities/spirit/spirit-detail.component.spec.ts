/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { SpiritDetailComponent } from 'app/entities/spirit/spirit-detail.component';
import { Spirit } from 'app/shared/model/spirit.model';

describe('Component Tests', () => {
    describe('Spirit Management Detail Component', () => {
        let comp: SpiritDetailComponent;
        let fixture: ComponentFixture<SpiritDetailComponent>;
        const route = ({ data: of({ spirit: new Spirit(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [SpiritDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SpiritDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SpiritDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.spirit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
