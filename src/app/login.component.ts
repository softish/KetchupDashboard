import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthenticationService]
})
export class LoginComponent {

  submitted = false;
  user: User = {
    username: '',
    password: ''
  };
  authUser: AuthenticatedUser;

  constructor(
        private authenticationService: AuthenticationService,
        ) { }

  onSubmit() {
    console.log('onSubmint ...');
    this.submitted = true;
    this.authenticate(this.user);
  }

  authenticate(user: User): void {
    this.authenticationService.authenticate(user).subscribe(authUser => {
      this.authUser = authUser;
      console.log(authUser);
    });
  }
}

export class User {
  username: string;
  password: string;
}

export class AuthenticatedUser {
  id: number;
  username: string;
}
