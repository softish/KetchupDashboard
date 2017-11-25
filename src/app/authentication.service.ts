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
    
    private authenticateEndpoint: string;

    constructor(private http: Http) {
        if(isDevMode()) {
            this.authenticateEndpoint = 'http://localhost:8080/user/authenticate';
        } else {
            this.authenticateEndpoint = 'http://zapto.ketchup.org:5757/user/authenticate';
        }
    }

    authenticate(user: User) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.authenticateEndpoint, user)
        .map((response: Response) => response.json());
    }
}
