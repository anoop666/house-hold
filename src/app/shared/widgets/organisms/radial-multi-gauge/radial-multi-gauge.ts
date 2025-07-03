import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more.js';
import SolidGauge from 'highcharts/modules/solid-gauge.js';

// Initialize modules in order
More(Highcharts);
SolidGauge(Highcharts)

export interface RadialGaugeSeries {
  /** Display name shown in the legend */
  name: string;
  /** Absolute value represented by the arc */
  value: number;
  /** CSS colour for the arc and legend dot */
  color: string;
}

@Component({
  selector: 'app-radial-multi-gauge',
  templateUrl: './radial-multi-gauge.html',
  styleUrls: ['./radial-multi-gauge.scss'],
  imports:[HighchartsChartModule,CommonModule]
})
export class RadialMultiGaugeComponent implements OnChanges {
  /**
   * List of arcs to draw – the first item becomes the outer‑most ring.
   */
  @Input() series: RadialGaugeSeries[] = [];

  /**
   * Maximum value on the gauge. By default 100, but you can pass any number
   * (for instance the sum of all series) so that percentages are calculated
   * the way you need.
   */
  @Input() total = 100;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnChanges(): void {
    this.buildChart();
  }

  /**
   * Translate the @Input()s into Highcharts options.
   */
  private buildChart(): void {
    const ringThickness = 12; // in % of radius
    const gapBetweenRings = 6; // in % of radius
    const outerMost = 100; // start at 100 % then walk inward

   const paneBackground: Highcharts.PaneBackgroundOptions[] = [];

    const solidSeries: Highcharts.SeriesSolidgaugeOptions[] = [];

    this.series.forEach((s, i) => {
      const outer = outerMost - i * (ringThickness + gapBetweenRings);
      const inner = outer - ringThickness;

      // Grey backdrop ring
      paneBackground.push({
        shape: 'arc',
        outerRadius: `${outer}%`,
        innerRadius: `${inner}%`,
        backgroundColor: '#eceff1'
      });

      // Actual coloured value ring
      solidSeries.push({
        type: 'solidgauge',
        name: s.name,
        data: [{
          y: s.value,
          radius: `${outer}%`,
          innerRadius: `${inner}%`,
          color: s.color,
        }],
        dataLabels: { enabled: false }
      });
    });

    this.chartOptions = {
      chart: {
        type: 'solidgauge',
        height: 260,
        spacing: [0, 0, 0, 0],
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
      },
      title: undefined,
      tooltip: { enabled: false },
      pane: {
        center: ['50%', '50%'], // move chart left so legend fits on the right
        size: '100%',
        startAngle: 0,
        endAngle: 270,
        background: paneBackground
      },
      yAxis: {
        min: 0,
        max: this.total,
        lineWidth: 0,
        tickPositions: []
      },
      plotOptions: {
        solidgauge: {
            rounded: true
        }
      },
      series: solidSeries as Highcharts.SeriesOptionsType[]
    };
  }

  /** Utility to convert absolute value → percent */
  getPercent(value: number): number {
    return (value / this.total) * 100;
  }
}
