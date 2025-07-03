import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-half-donut-chart',
  imports: [HighchartsChartModule,CommonModule],
  templateUrl: './half-donut-chart.html',
  styleUrl: './half-donut-chart.scss'
})
export class HalfDonutChart {
  @Input() count1: number = 0;
  @Input() count2: number = 0;
  @Input() name1: string = '';
  @Input() name2: string = '';
   @Input() icon1: string = '';
  @Input() icon2: string = '';
  @Input() type: string = 'half';
  @Input() data: { name: string, value: number, percentage: number, color: string }[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  total: number = 0;

  ngOnInit() {
    this.total = this.count1 + this.count2;

    this.chartOptions = {
  chart: {
    type: 'pie',
    height: 300,
    backgroundColor: 'transparent'
  },
  title: {
    verticalAlign: 'middle',
    floating: true,
    useHTML: true,
    y: 50 // shift slightly for better centering
  },
  tooltip: {
    enabled: true
  },
  plotOptions: {
    pie: {
      innerSize: '80%',
      borderRadius:12,
      dataLabels: {
        enabled: false
      },
      startAngle: -135,
      endAngle: 135,
      center: ['50%', '65%'] // shift center upward to compensate
    }
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  series: [
    {
      type: 'pie',
      data: [
        {
          name: 'Male',
          y: this.count1,
          color: '#3da9fc'
        },
        {
          name: 'Female',
          y: this.count2,
          color: '#d65db1'
        }
      ]
    }
  ]
};
  }
}
