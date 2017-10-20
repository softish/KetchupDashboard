import { Component } from '@angular/core';
import { User } from './login.component';

@Component({
  selector: 'app-dashboard',
  template: '<h3>{{user.username}} dashboard</h3>'
})

export class DashboardComponent {
    user: User = {
        id: 1,
        username: 'foo',
        password: ''
      };
}
