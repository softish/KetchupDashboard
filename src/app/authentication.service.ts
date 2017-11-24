import { Injectable } from '@angular/core';
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

    constructor(private http: Http) {
    }

    authenticate(user: User) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8080/user/authenticate', user)
        .map((response: Response) => response.json());
    }
}
