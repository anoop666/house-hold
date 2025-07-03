import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options, SeriesBarOptions } from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import HCMore from 'highcharts/highcharts-more';

HCMore(Highcharts);

@Component({
  selector: 'app-stacked-bar-chart',
  imports: [HighchartsChartModule, CommonModule],
  templateUrl: './stacked-bar-chart.html',
  styleUrl: './stacked-bar-chart.scss',
})
export class StackedBarChart implements OnChanges {
  Highcharts = Highcharts;

  @Input() data: { name: string; value: number; color: string }[] = [];

  @Input() barHeight = 12;

  chartOptions!: Options;

  ngOnChanges(): void {
    if (!this.data?.length) {
      return;
    }

    const total = this.data.reduce((s, d) => s + d.value, 0);

    const series: SeriesBarOptions[] = this.data.map((d) => ({
      type: 'bar',
      name: d.name,
      color: d.color,
      data: [d.value],
      showInLegend: true,
      custom: {
        absolute: d.value,
        percent: +((d.value / total) * 100).toFixed(1),
      },
    }));

    this.chartOptions = {
      chart: {
      type: 'bar',
      backgroundColor: 'rgba(250,250,250,0.1)',
      height: this.barHeight + 90,
      spacing: [0, 0, 50, 0],
      inverted: true,
      },

      title: { text: undefined },
      credits: { enabled: false },
      exporting: { enabled: false },

      xAxis: { visible: false },
      yAxis: {
      visible: false,
      max: total,
      stackLabels: { enabled: false },
      },
      tooltip: {
      enabled: true,
      useHTML: true,
      formatter: function () {
        const point = this.point as Highcharts.Point & {
        series: {
          name: string;
          color: string;
          options: { custom?: { absolute?: number; percent?: number } };
        };
        };
        const abs = point.y?.toLocaleString?.() ?? 'N/A';
        const pct = point.series.options.custom?.percent ?? '0';
        return `
        <div style="min-width:100px;">
          <div style="font-weight:600;color:${point.series.color}">${point.series.name}</div>
          <div>${abs} (${pct}%)</div>
        </div>
        `;
      },
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderRadius: 6,
      borderWidth: 1,
      shadow: false,
      style: {
        color: '#333',
        fontSize: '13px',
      },
      },
      plotOptions: {
      series: {
        stacking: 'normal',
        borderWidth: 0,
        borderRadius: 6,
        groupPadding: 0,
        pointPadding: 0,
        pointWidth: 10,
        marker: { enabled: false },
      },
      },
      legend: {
      enabled: false,
      useHTML: true,
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      symbolWidth: 8,
      symbolHeight: 8,
      symbolRadius: 4,
      itemMarginBottom: 10,
      legend: {
        useHTML: true,
        align: 'left',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        symbolWidth: 8,
        symbolHeight: 8,
        symbolRadius: 4,
        itemMarginBottom: 8,
        itemStyle: {
        whiteSpace: 'nowrap',
        fontSize: '13px',
        },
        labelFormatter: function () {
        const s = this as unknown as Highcharts.Series & {
          custom?: {
          absolute?: number;
          percent?: number;
          };
        };

        const abs = s.custom?.absolute?.toLocaleString?.() ?? 'N/A';
        const pct = s.custom?.percent ?? '0';

        return `
    <div style="display:inline-block;min-width:140px;margin-right:12px">
      <div style="font-weight:600">${s.name}</div>
      <div>${abs} (${pct}%)</div>
    </div>
    `;
        },
      },
      },
      series,
    } as Options;
  }

  getLegendData() {
    const total = this.data.reduce((sum, s) => sum + s.value, 0);
    return this.data.map((s) => ({
      name: s.name,
      color: s.color,
      value: s.value,
      percent: total > 0 ? ((s.value / total) * 100).toFixed(1) : '0.0',
    }));
  }
}
