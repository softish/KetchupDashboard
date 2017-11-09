import { Component } from '@angular/core';

import { DetailedSession } from './detailed-session';

@Component({
    selector: 'app-session-breakdown',
    templateUrl: './session-breakdown.html'
})

export class SessionBreakdownComponent {
    public chartOptions: any = {
        responsive: true,
        animation: false,
    };

    public chartLabels: string[] = ['PR #1', 'Issue #42', 'Some feature'];
    public chartType = 'pie';
    public chartLegend = true;

    public chartData: any[] = [
        { data: [120, 60, 20] },
    ];

    public update(values: DetailedSession[]) {
        this.chartLabels.length = 0;
        this.chartData.length = 0;
        for (let i = 0; i < values.length; i++) {
            this.chartLabels.push(values[i].task);
            this.chartData.push(values[i].totalDuration);
        }

        const clone = JSON.parse(JSON.stringify(this.chartData));
        this.chartData = clone;
    }

    public chartClicked(e: any): void {
        console.log(e);
    }
}
