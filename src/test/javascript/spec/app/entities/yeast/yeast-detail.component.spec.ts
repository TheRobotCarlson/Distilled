/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { YeastDetailComponent } from 'app/entities/yeast/yeast-detail.component';
import { Yeast } from 'app/shared/model/yeast.model';

describe('Component Tests', () => {
    describe('Yeast Management Detail Component', () => {
        let comp: YeastDetailComponent;
        let fixture: ComponentFixture<YeastDetailComponent>;
        const route = ({ data: of({ yeast: new Yeast(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [YeastDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(YeastDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(YeastDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.yeast).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
