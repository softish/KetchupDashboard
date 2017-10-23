import { Component } from '@angular/core';

@Component({
 selector: 'session-bar-chart',
 templateUrl: './session-bar-chart.html'
})
export class SessionBarChartComponent {
 public barChartOptions:any = {
   scaleShowVerticalLines: false,
   responsive: true,
 };
 public barChartLabels:string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
 public barChartType:string = 'bar';
 public barChartLegend:boolean = true;

 public barChartData:any[] = [
   {data: [120, 60, 20, 240, 360, 80, 40], label: 'Sessions'}
 ];

 public barChartColors:Array<any> = [
  {
    backgroundColor: 'rgba(0,128,201,1)',
    borderColor: 'rgba(148,159,177,1)',
  },
];

 public chartClicked(e:any):void {
   console.log(e);
 }
}