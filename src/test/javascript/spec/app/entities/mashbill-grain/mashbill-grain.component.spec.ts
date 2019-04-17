/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { MashbillGrainComponent } from 'app/entities/mashbill-grain/mashbill-grain.component';
import { MashbillGrainService } from 'app/entities/mashbill-grain/mashbill-grain.service';
import { MashbillGrain } from 'app/shared/model/mashbill-grain.model';

describe('Component Tests', () => {
    describe('MashbillGrain Management Component', () => {
        let comp: MashbillGrainComponent;
        let fixture: ComponentFixture<MashbillGrainComponent>;
        let service: MashbillGrainService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MashbillGrainComponent],
                providers: []
            })
                .overrideTemplate(MashbillGrainComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MashbillGrainComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MashbillGrainService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MashbillGrain(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mashbillGrains[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
