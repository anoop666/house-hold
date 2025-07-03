import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import HCMore from 'highcharts/highcharts-more';
import HCSolidGauge from 'highcharts/modules/solid-gauge';

HCMore(Highcharts);
HCSolidGauge(Highcharts);

export interface DonutSlice {
  name: string;
  value: number;
  color?: any;
}

@Component({
  selector: 'app-multi-donut-chart',
  imports: [HighchartsChartModule, CommonModule],
  templateUrl: './multi-donut-chart.html',
  styleUrl: './multi-donut-chart.scss'
})
export class MultiDonutChart implements OnChanges {
  @Input() data: DonutSlice[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  updateFlag = false;
  processedData: Array<DonutSlice & { percentage: number; color: string }> = [];
  total:number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.buildChart();
    }
  }

  private buildChart(): void {
    if (!this.data?.length) {
      return;
    }

    // total value for centre label & percentages
    const total = this.data.reduce((acc, cur) => acc + cur.value, 0);
    this.total = total;

    // Use Highcharts default palette when color is not provided.
    const palette = Highcharts.getOptions().colors || [];

    this.processedData = this.data.map((d, idx) => ({
      ...d,
      color: d.color || palette[idx % palette.length],
      percentage: (d.value / total) * 100,
    }));

    this.chartOptions = {
      chart: {
        type: 'pie',
        height: 260,
        backgroundColor: 'rgba(250,250,250,0.1)'
      },
      title: { text: undefined },
      tooltip: {
        pointFormat: '<b>{point.y}</b> ({point.percentage:.1f}%)',
      },
      plotOptions: {
        pie: {
          innerSize: '80%',
          borderRadius:12,
          dataLabels: { enabled: false },
          borderWidth: 0,
          startAngle: -135,
          endAngle: 135,
          center: ['50%', '65%']
        },
      },
      legend: { enabled: false }, // we render our own legend
      credits: { enabled: false },
      series: [
        {
          type: 'pie',
          data: this.processedData.map((d) => ({
            name: d.name,
            y: d.value,
            color: d.color,
          })),
        },
      ],
    } as Highcharts.Options;

    this.updateFlag = true;
  }

}
