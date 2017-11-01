import { Component, ViewChild } from '@angular/core';

import { User } from './login.component';
import { Session } from './session';
import { SessionService } from './session.service';
import { AuthenticatedUser } from './login.component';
import { SessionBarChartComponent } from './session-bar-chart.component';
import { SessionRange } from './session-range';

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

    sessionRange: SessionRange = {
      userId: this.authenticatedUser.id,
      endOfRangeDate: '2017-10-26 00:00:00+02'
    };

    @ViewChild(SessionBarChartComponent) sessionBarChartComponent: SessionBarChartComponent;

    constructor(
      private sessionService: SessionService,
      ) {
        console.log(this.sessionRange);
        this.getRangeOfSessions();
      }

    getLatestSession() {
      this.sessionService.getLatest(this.authenticatedUser).subscribe(session => {
        console.log(session);
        this.sessionBarChartComponent.updateFirst(session.duration);
      });
    }

    getRangeOfSessions() {
      this.sessionService.getDurationInRange(this.sessionRange).subscribe(sessionStatistics => {
        console.log(sessionStatistics);
        this.sessionBarChartComponent.updateRange(sessionStatistics);
      });
    }
}
