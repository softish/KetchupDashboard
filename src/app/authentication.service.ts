import { Injectable, isDevMode } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from './login.component';
import { AuthenticatedUser } from './login.component';

@Injectable()
export class AuthenticationService {
    user: User = {
        username: '',
        password: ''
    };

    readonly devBaseURL: string = 'http://localhost:8080';
    readonly prodBaseURL: string = 'http://zapto.ketchup.org:5757';

    private authenticateEndpoint: string;

    constructor(private http: Http) {
        if (isDevMode()) {
            this.authenticateEndpoint = this.devBaseURL + '/user/authenticate';
        } else {
            this.authenticateEndpoint = this.prodBaseURL + '/user/authenticate';
        }
    }

    authenticate(user: User) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.authenticateEndpoint, user)
        .map((response: Response) => response.json());
    }
}
