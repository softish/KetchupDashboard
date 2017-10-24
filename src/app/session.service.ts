import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthenticatedUser } from './login.component';
import { Session } from './session';

@Injectable()
export class SessionService {
    constructor(private http: Http) {
    }

    getLatest(authenticatedUser: AuthenticatedUser) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8080/session/getLatest', authenticatedUser).map((response: Response) => response.json());
    }
}
