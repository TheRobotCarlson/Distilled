/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ScheduleService } from 'app/entities/schedule/schedule.service';
import { ISchedule, Schedule } from 'app/shared/model/schedule.model';

describe('Service Tests', () => {
    describe('Schedule Service', () => {
        let injector: TestBed;
        let service: ScheduleService;
        let httpMock: HttpTestingController;
        let elemDefault: ISchedule;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ScheduleService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Schedule(0, currentDate, 'AAAAAAA', 0, 0, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        targetDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Schedule', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        targetDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        targetDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Schedule(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Schedule', async () => {
                const returnedFromService = Object.assign(
                    {
                        targetDate: currentDate.format(DATE_TIME_FORMAT),
                        orderCode: 'BBBBBB',
                        barrelCount: 1,
                        targetProof: 1,
                        notes: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        targetDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Schedule', async () => {
                const returnedFromService = Object.assign(
                    {
                        targetDate: currentDate.format(DATE_TIME_FORMAT),
                        orderCode: 'BBBBBB',
                        barrelCount: 1,
                        targetProof: 1,
                        notes: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        targetDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Schedule', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
