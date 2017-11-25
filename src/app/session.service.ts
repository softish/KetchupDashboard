import { Injectable, isDevMode } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthenticatedUser } from './login.component';
import { Session } from './session';
import { SessionRange } from './session-range';

@Injectable()
export class SessionService {

    private getLatestEndpoint: string;
    private getRangeEndpoint: string;
    private getDetailedRangeEndpoint: string;
    private getDetailedForDateEndpoint: string;

    constructor(private http: Http) {
        if(isDevMode()) {
            this.getLatestEndpoint = 'http://localhost:8080/session/getLatest';
            this.getRangeEndpoint = 'http://localhost:8080/session/getRange';
            this.getDetailedRangeEndpoint = 'http://localhost:8080/session/getDetailedRange';
            this.getDetailedForDateEndpoint = 'http://localhost:8080/session/getDetailedForDate';
        } else {
            this.getLatestEndpoint = 'http://zapto.ketchup.org:5757/session/getLatest';
            this.getRangeEndpoint = 'http://zapto.ketchup.org:5757/getRange';
            this.getDetailedRangeEndpoint = 'http://zapto.ketchup.org:5757/session/getDetailedRange';
            this.getDetailedForDateEndpoint = 'http://zapto.ketchup.org:5757/session/getDetailedForDate';
        }
    }

    getLatest(authenticatedUser: AuthenticatedUser) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.getLatestEndpoint, authenticatedUser).map((response: Response) => response.json());
    }

    getDurationInRange(sessionRange: SessionRange) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.getRangeEndpoint, sessionRange).map((response: Response) => response.json());
    }

    getDetailedDurationInRange(sessionRange: SessionRange) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.getDetailedRangeEndpoint, sessionRange).map((response: Response) => response.json());
    }

    getBreakdownForDate(sessionRange: SessionRange) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.getDetailedForDateEndpoint, sessionRange)
            .map((response: Response) => response.json());
    }
}
