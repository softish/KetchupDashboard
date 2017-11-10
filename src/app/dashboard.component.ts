import { Component, ViewChild, AfterViewInit } from '@angular/core';

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

export class DashboardComponent implements AfterViewInit {
  ranges = ['3 days', '7 days', '30 days'];
  selectedRange: string = this.ranges[1];

  authenticatedUser: AuthenticatedUser = {
    id: 1,
    username: 'foo'
  };

  sessionRange: SessionRange = {
    userId: this.authenticatedUser.id,
    endOfRangeDate: this.getDate(this.selectedRange)
  };

  @ViewChild(SessionBarChartComponent) sessionBarChartComponent: SessionBarChartComponent;

  constructor(private sessionService: SessionService) {
    console.log(this.sessionRange);
  }

  ngAfterViewInit() {
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

  onSelect(): void {
    this.sessionRange.endOfRangeDate = this.getDate(this.selectedRange);
    this.getRangeOfSessions();
  }

  getDate(selectedRange: string): string {
    const dayOffset = (24 * 60 * 60 * 1000);
    let t: Date;

    if (selectedRange === this.ranges[0]) {
      t = new Date(Date.now() - dayOffset * (3 - 1));
    }

    if (selectedRange === this.ranges[1]) {
      t = new Date(Date.now() - dayOffset * (7 - 1));
    }

    if (selectedRange === this.ranges[2]) {
      t = new Date(Date.now() - dayOffset * (30 - 1));
    }

    t.setHours(t.getHours() + 1);

    return t.toISOString().replace('T', ' ').replace(/.(\d+)Z/, '') + '+02';
  }
}
