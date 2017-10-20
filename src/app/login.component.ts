import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  submitted = false;

  user: User = {
    id: 1,
    username: '',
    password: ''
  };

  login(): void {
    console.log('login ...');
    console.log(this.submitted);
  }

  onSubmit() {
    console.log('onSubmint ...');
    this.submitted = true;
  }
}

export class User {
  id: number;
  username: string;
  password: string;
}
