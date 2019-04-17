/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { MasterSummaryComponent } from 'app/entities/master-summary/master-summary.component';
import { MasterSummaryService } from 'app/entities/master-summary/master-summary.service';
import { MasterSummary } from 'app/shared/model/master-summary.model';

describe('Component Tests', () => {
    describe('MasterSummary Management Component', () => {
        let comp: MasterSummaryComponent;
        let fixture: ComponentFixture<MasterSummaryComponent>;
        let service: MasterSummaryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [MasterSummaryComponent],
                providers: []
            })
                .overrideTemplate(MasterSummaryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MasterSummaryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MasterSummaryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MasterSummary(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.masterSummaries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
