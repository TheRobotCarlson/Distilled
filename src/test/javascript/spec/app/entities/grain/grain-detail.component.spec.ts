/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { GrainDetailComponent } from 'app/entities/grain/grain-detail.component';
import { Grain } from 'app/shared/model/grain.model';

describe('Component Tests', () => {
    describe('Grain Management Detail Component', () => {
        let comp: GrainDetailComponent;
        let fixture: ComponentFixture<GrainDetailComponent>;
        const route = ({ data: of({ grain: new Grain(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [GrainDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GrainDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GrainDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.grain).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
