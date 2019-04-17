/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { BarrelDetailComponent } from 'app/entities/barrel/barrel-detail.component';
import { Barrel } from 'app/shared/model/barrel.model';

describe('Component Tests', () => {
    describe('Barrel Management Detail Component', () => {
        let comp: BarrelDetailComponent;
        let fixture: ComponentFixture<BarrelDetailComponent>;
        const route = ({ data: of({ barrel: new Barrel(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [BarrelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BarrelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BarrelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.barrel).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
