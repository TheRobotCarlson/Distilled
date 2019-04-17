/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { MashbillYeastComponent } from 'app/entities/mashbill-yeast/mashbill-yeast.component';
import { MashbillYeastService } from 'app/entities/mashbill-yeast/mashbill-yeast.service';
import { MashbillYeast } from 'app/shared/model/mashbill-yeast.model';

describe('Component Tests', () => {
    describe('MashbillYeast Management Component', () => {
        let comp: MashbillYeastComponent;
        let fixture: ComponentFixture<MashbillYeastComponent>;
        let service: MashbillYeastService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MashbillYeastComponent],
                providers: []
            })
                .overrideTemplate(MashbillYeastComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MashbillYeastComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MashbillYeastService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MashbillYeast(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mashbillYeasts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
