import { Component } from '@angular/core';

import { DetailedSession } from './detailed-session';

@Component({
  selector: 'app-stacked-sessions',
  templateUrl: './stacked-sessions.html'
})
export class StackedSessionsComponent {
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
          },
          stacked: true
      }]
  }
  };
  public barChartLabels: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [120, 60, 20, 240, 0, 80, 40], label: 'Feature #2' },
    { data: [240, 30, 34, 345, 0, 80, 40], label: 'PR #3' },
    { data: [0, 60, 20, 565, 360, 80, 0], label: 'Issue #4' }
  ];

  public chartClicked(e: any): void {
    console.log(e);
  }

  public updateFirst(value: number) {
    const data = [value, 60, 20, 240, 360, 80, 40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

  public updateRange(values: DetailedSession[]) {
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
