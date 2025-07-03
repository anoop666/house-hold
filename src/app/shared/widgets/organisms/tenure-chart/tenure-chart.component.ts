import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as Highcharts from 'highcharts';

export interface TenureChartData {
  categories: string[];
  data: {
    category: string;
    emirati: number;
    nonEmirati: number;
  }[];
  maxValue: number;
  minValue: number;
}

export interface ChartColors {
  emirati: string;
  nonEmirati: string;
}

@Component({
  selector: 'app-tenure-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tenure-chart.component.html',
  styleUrls: ['./tenure-chart.component.scss']
})
export class TenureChartComponent implements OnInit, OnChanges {
  @Input() chartData!: TenureChartData;
  @Input() chartColors: ChartColors = {
    emirati: '#D4B896',
    nonEmirati: '#7A8471'
  };

  private chart: Highcharts.Chart | undefined;

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] || changes['chartColors']) {
      this.updateChart();
    }
  }

  private updateChart() {
    if (!this.chartData) return;

    const emiratiData = this.chartData.data.map(item => item.emirati);
    const nonEmiratiData = this.chartData.data.map(item => item.nonEmirati);

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'bar',
        backgroundColor: 'transparent',
        height: 300,
        marginLeft: 120
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: this.chartData.categories,
        labels: {
          style: {
            color: '#666666',
            fontSize: '12px'
          }
        },
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0
      },
      yAxis: {
        min: this.chartData.minValue,
        max: this.chartData.maxValue,
        title: {
          text: ''
        },
        labels: {
          formatter: function() {
            const value = this.value as number;
            if (value === this.axis.min) return value.toString();
            if (value === this.axis.max) return value.toString();
            return '';
          },
          style: {
            color: '#666666',
            fontSize: '12px'
          }
        },
        gridLineColor: '#E5E5E5',
        gridLineWidth: 1,
        tickPositions: [this.chartData.minValue, this.chartData.maxValue],
        minorTickInterval: this.chartData.maxValue / 6,
        minorGridLineWidth: 1,
        minorGridLineColor: '#E5E5E5'
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        bar: {
          stacking: 'normal',
          borderWidth: 0,
          pointPadding: 0.3,
          groupPadding: 0.1
        }
      },
      series: [{
        name: 'Non-Emirati',
        data: nonEmiratiData,
        color: this.chartColors.nonEmirati,
        type: 'bar'
      }, {
        name: 'Emirati',
        data: emiratiData,
        color: this.chartColors.emirati,
        type: 'bar'
      }],
      tooltip: {
        formatter: function() {
          return `<b>${this.series.name}</b><br/>
                  ${this.x}: ${(this.y as number).toLocaleString()}`;
        }
      },
      credits: {
        enabled: false
      }
    };

    // Create or update the chart
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = Highcharts.chart('tenure-chart-container', chartOptions);
  }
}
