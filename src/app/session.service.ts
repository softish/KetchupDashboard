import { Injectable, isDevMode } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthenticatedUser } from './login.component';
import { Session } from './session';
import { SessionRange } from './session-range';

@Injectable()
export class SessionService {

    readonly devBaseURL: string = 'http://localhost:8080';
    readonly prodBaseURL: string = 'http://zapto.ketchup.org:5757';

    private getLatestEndpoint: string;
    private getRangeEndpoint: string;
    private getDetailedRangeEndpoint: string;
    private getDetailedForDateEndpoint: string;

    constructor(private http: Http) {
        if (isDevMode()) {
            this.getLatestEndpoint = this.devBaseURL + '/session/getLatest';
            this.getRangeEndpoint = this.devBaseURL + '/session/getRange';
            this.getDetailedRangeEndpoint = this.devBaseURL + '/session/getDetailedRange';
            this.getDetailedForDateEndpoint = this.devBaseURL + '/session/getDetailedForDate';
        } else {
            this.getLatestEndpoint = this.prodBaseURL + '/session/getLatest';
            this.getRangeEndpoint = this.prodBaseURL + '/getRange';
            this.getDetailedRangeEndpoint = this.prodBaseURL + '/session/getDetailedRange';
            this.getDetailedForDateEndpoint = this.prodBaseURL + '/session/getDetailedForDate';
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
