/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DistilledTestModule } from '../../../test.module';
import { YeastSummaryComponent } from 'app/entities/yeast-summary/yeast-summary.component';
import { YeastSummaryService } from 'app/entities/yeast-summary/yeast-summary.service';
import { YeastSummary } from 'app/shared/model/yeast-summary.model';

describe('Component Tests', () => {
    describe('YeastSummary Management Component', () => {
        let comp: YeastSummaryComponent;
        let fixture: ComponentFixture<YeastSummaryComponent>;
        let service: YeastSummaryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DistilledTestModule],
                declarations: [YeastSummaryComponent],
                providers: []
            })
                .overrideTemplate(YeastSummaryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(YeastSummaryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YeastSummaryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new YeastSummary(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.yeastSummaries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
