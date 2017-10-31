import { Component } from '@angular/core';

import { TimedSessionStatistics } from './timed-session-statistics';

@Component({
 selector: 'session-bar-chart',
 templateUrl: './session-bar-chart.html'
})
export class SessionBarChartComponent {
 public barChartOptions: any = {
   scaleShowVerticalLines: false,
   responsive: true,
 };
 public barChartLabels: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
 public barChartType = 'bar';
 public barChartLegend = true;

 public barChartData: any[] = [
   {data: [120, 60, 20, 240, 360, 80, 40], label: 'Total session duration'}
 ];

 public barChartColors: Array<any> = [
  {
    backgroundColor: 'rgba(0,128,201,1)',
    borderColor: 'rgba(148,159,177,1)',
  },
];

 public chartClicked(e: any): void {
   console.log(e);
 }

 public updateFirst(value: number) {
  let data = [value, 60, 20, 240, 360, 80, 40];
  let clone = JSON.parse(JSON.stringify(this.barChartData));
  clone[0].data = data;
  this.barChartData = clone;
 }

 public updateRange(values: TimedSessionStatistics) {
  let data = [values[0].totalDuration, values[1].totalDuration, 20, 240, 360, 80, 40];
  let clone = JSON.parse(JSON.stringify(this.barChartData));
  clone[0].data = data;
  this.barChartData = clone;

  let labelsData = [values[0].date, values[1].date];
  this.barChartLabels.length = 0;
  for (let i = 0; i < labelsData.length; i++) {
    this.barChartLabels.push(labelsData[i]);
  }
 }
}
