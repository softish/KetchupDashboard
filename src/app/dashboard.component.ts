import { Component, ViewChild } from '@angular/core';

import { User } from './login.component';
import { Session } from './session';
import { SessionService } from './session.service'
import { AuthenticatedUser } from './login.component';
import { SessionBarChartComponent } from './session-bar-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [SessionService]
})

export class DashboardComponent {
    authenticatedUser: AuthenticatedUser = {
      id: 1,  
      username: 'foo'
    };

    @ViewChild(SessionBarChartComponent) sessionBarChartComponent: SessionBarChartComponent;

    constructor(
      private sessionService: SessionService,
      ) { 

        this.getLatestSession();
      }

    getLatestSession() {
      this.sessionService.getLatest(this.authenticatedUser).subscribe(session => {
        console.log(session);
        this.sessionBarChartComponent.updateFirst(session.duration);
      });
    }
}
