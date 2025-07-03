import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grouped-bar-chart',
  imports: [HighchartsChartModule, CommonModule],
  templateUrl: './grouped-bar-chart.html',
  styleUrl: './grouped-bar-chart.scss',
})
export class GroupedBarChart implements OnChanges {
  @ViewChild('chartRef', { static: false })
  chartComponent!: HighchartsChartComponent;

  @Input() categories: string[] = [];
  @Input() seriesData: { name: string; data: number[]; color?: string }[] = [];
  @Input() titleX: string = '';
  @Input() titley: string = '';

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnChanges(): void {
    this.chartOptions = {
      chart: { type: 'column',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        width: 600,
        height: 200 
      },
      title: { text: '' },
      xAxis: {
        categories: this.categories,
        title: { text: this.titleX },
        tickLength: 0,
        gridLineWidth: 0,
      },
      yAxis: {
        min: 0,
        title: { text: this.titley },
        gridLineWidth: 0,
      },
      legend: {
        enabled: false,
      },
      tooltip: { shared: true },
      plotOptions: {
        column: {
          grouping: true,
          borderWidth: 0,
          groupPadding: 0.2,
          pointPadding: 0.3,
        },
        series: {
          events: {
            legendItemClick: function () {
              return false;
            },
          },
        },
      },
      series: this.seriesData as Highcharts.SeriesColumnOptions[],
    };
  }
}
