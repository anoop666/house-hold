import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-full-donut-chart',
  imports: [HighchartsChartModule,CommonModule],
  templateUrl: './full-donut-chart.html',
  styleUrl: './full-donut-chart.scss'
})
export class FullDonutChart implements OnChanges {
  @Input() data: { name: string, value: number, percentage: number, color: string }[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  total:number = 0;

  ngOnChanges(): void {
    const total = this.data.reduce((sum, d) => sum + d.value, 0);
    this.total = total;

    this.chartOptions = {
      chart: {
        type: 'pie',
        height: 300,
        backgroundColor: 'rgba(250,250,250,0.2)'
      },
      title: { text: undefined },
      tooltip: {
        pointFormat: '<b>{point.y:}</b> ({point.percentage:.1f}%)'
      },
      plotOptions: {
        pie: {
          innerSize: '80%',
          borderRadius:12,
          dataLabels: { enabled: false },
          showInLegend: true
        }
      },
      legend:{enabled:false},
      // legend: {
      //   align: 'right',
      //   layout: 'vertical',
      //   verticalAlign: 'middle',
      //   labelFormatter: function (this: Highcharts.Point | Highcharts.Series) {
      //   if ('y' in this && typeof this.y === 'number') {
      //     const val = this.y?.toLocaleString();
      //     return `<span style="color:${(this as Highcharts.Point).color}">\u25CF</span> <b>${this.name}</b><br>${val}<br>${this.percentage?.toFixed(0)}%`;
      //   }
      //   return this.name as string;
      //   },
      //   useHTML: true,
      //   symbolWidth: 0,
      //   itemMarginTop: 8
      // },
      series: [{
        name: 'Household Size',
        type: 'pie',
        data: this.data.map(d => ({
          name: d.name,
          y: d.value,
          color: d.color
        }))
      }]
    };
  }
}