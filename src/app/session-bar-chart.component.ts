import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { TimedSessionStatistics } from './timed-session-statistics';
import { SessionBreakdownComponent } from './session-breakdown.component';
import { SessionRange } from './session-range';

import { SessionService } from './session.service';

@Component({
  selector: 'app-session-bar-chart',
  templateUrl: './session-bar-chart.html',
  providers: [SessionService]
})
export class SessionBarChartComponent implements AfterViewInit {

  breakdownActivated = false;

  @ViewChild(SessionBreakdownComponent) sessionBreakdownComponent: SessionBreakdownComponent;

  constructor(private sessionService: SessionService) {
  }

  sessionRange: SessionRange = {
    userId: 1,
    endOfRangeDate: '2017-10-26 01:23:30+02'
  };

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    animation: false,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        display: true,
        ticks: {
          suggestedMax: 10,
          suggestedMin: 0,
          beginAtZero: true,
        }
      }]
    }
  };

  public barChartLabels: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [120, 60, 20, 240, 360, 80, 40], label: 'Total session duration' }
  ];

  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0,128,201,1)',
      borderColor: 'rgba(148,159,177,1)',
    },
  ];

  public chartClicked(e: any): void {
    if (e.active.length > 0) {
      console.log(e.active[0]._view.label);
      const date = e.active[0]._view.label;
      this.sessionRange.endOfRangeDate = date + ' 12:00:00+02';
      this.getDetailsForDate(this.sessionRange);
      this.breakdownActivated = true;
    }
  }

  public chartHovered(e: any): void {
  }

  getDetailsForDate(sessionRange: SessionRange) {
    this.sessionService.getBreakdownForDate(sessionRange).subscribe(sessionStatistics => {
      console.log(sessionStatistics);
      this.sessionBreakdownComponent.update(sessionStatistics);
    });
  }

  ngAfterViewInit() {
    console.log(this.sessionBreakdownComponent);
  }

  public updateFirst(value: number) {
    const data = [value, 60, 20, 240, 360, 80, 40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

  public updateRange(values: TimedSessionStatistics[]) {
    const data = [];
    this.barChartLabels.length = 0;
    for (let i = 0; i < values.length; i++) {
      data[i] = values[i].totalDuration;
      this.barChartLabels.push(values[i].date);
    }
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }
}
