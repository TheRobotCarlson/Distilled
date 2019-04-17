/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistilledTestModule } from '../../../test.module';
import { BatchDetailComponent } from 'app/entities/batch/batch-detail.component';
import { Batch } from 'app/shared/model/batch.model';

describe('Component Tests', () => {
    describe('Batch Management Detail Component', () => {
        let comp: BatchDetailComponent;
        let fixture: ComponentFixture<BatchDetailComponent>;
        const route = ({ data: of({ batch: new Batch(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [BatchDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BatchDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BatchDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.batch).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
