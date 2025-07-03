import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-bar-line-chart',
  imports: [HighchartsChartModule],
  templateUrl: './bar-line-chart.html',
  styleUrl: './bar-line-chart.scss',
})
export class BarLineChart implements OnInit {
  @Input() data: { label: string; value: number; percentage: number }[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnInit(): void {
    const categories = this.data.map((d) => d.label);
    const values = this.data.map((d) => d.value);
    const percentages = this.data.map((d) => d.percentage);

    this.chartOptions = {
      chart: { backgroundColor:'rgba(250,250,250,0.1)' },
      title: { text: '' },
      xAxis: {
        categories,
        labels: {
          useHTML: true,
          formatter: function () {
            const value = values[this.pos] ?? '';
            return `${this.value}<br><b>${Highcharts.numberFormat(
              value,
              0
            )}</b>`;
          },
          rotation: 0,
          style: { whiteSpace: 'nowrap' },
        },
      },
      yAxis: [
        {
          title: { text: null },
          labels: { enabled: false },
          gridLineWidth: 0,
        },
      ],
      tooltip: { shared: true },
      legend: { enabled: false },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            inside: true,
            style: { fontWeight: 'bold', color: 'white' },
          },
        },
        line: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return `${this.y?.toFixed(1)}%`;
            },
            style: { fontWeight: 'bold', color: '#F4A300' },
          },
        },
      },
      series: [
        {
          type: 'column',
          name: 'Count',
          data: this.data.map((d) => d.value),
          color: '#3CB4AC',
          borderRadius: 6,
          pointPadding: 0,
          groupPadding: 0.05,
          borderWidth: 0,
          pointWidth: 30, 
          dataLabels: {
            enabled: false,
            inside: true,
            style: { fontWeight: 'bold', color: 'white' },
          },
        },
        {
          type: 'line',
          name: 'Percentage',
          data: this.data.map((d) => d.value),
          color: '#F4A300',
          marker: { enabled: true },
          dataLabels: {
            enabled: true,
            formatter: function () {
              return `${percentages[this.point.index].toFixed(1)}%`;
            },
            style: {
              fontWeight: 'bold',
              color: '#F4A300',
            },
          },
        },
      ],
    };
  }
}
