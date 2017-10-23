import { Component } from '@angular/core';
import { User } from './login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent {
    user: User = {
        username: 'foo',
        password: ''
      };
}
