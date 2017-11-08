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

    public chartClicked(e: any): void {
        console.log(e);
    }
}
