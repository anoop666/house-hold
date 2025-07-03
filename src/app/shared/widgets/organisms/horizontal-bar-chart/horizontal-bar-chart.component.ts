import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';

interface ChartDataItem {
  category: string;
  emirati: number;
  nonEmirati: number;
}

interface ChartData {
  categories: string[];
  data: ChartDataItem[];
  maxValue: number;
  minValue: number;
}

interface ChartColors {
  emirati: string;
  nonEmirati: string;
}

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss'],
  standalone: true
})
export class HorizontalBarChartComponent implements OnInit, OnDestroy {
  @Input() chartData: ChartData = {
    categories: [
      "Own",
      "Rent", 
      "Work advantage",
      "Provided by work"
    ],
    data: [
      {
        category: "Own",
        emirati: 160,
        nonEmirati: 222
      },
      {
        category: "Rent",
        emirati: 400,
        nonEmirati: 284
      },
      {
        category: "Work advantage",
        emirati: 44,
        nonEmirati: 67
      },
      {
        category: "Provided by work",
        emirati: 178,
        nonEmirati: 107
      }
    ],
    maxValue: 400,
    minValue: 0
  };

  @Input() chartColors: ChartColors = {
    emirati: '#D4A574', // Light brown/beige for Emirati
    nonEmirati: '#7A9B7E' // Green for Non-Emirati
  };

  private chart: Highcharts.Chart | undefined;

  ngOnInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    // Prepare data for Highcharts
    const emiratiData = this.chartData.data.map(item => item.emirati);
    const nonEmiratiData = this.chartData.data.map(item => item.nonEmirati);

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        height: 400,
        spacing: [20, 20, 20, 20]
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
          },
          align: 'left',
          x: 10
        },
        gridLineColor: '#E5E5E5',
        gridLineWidth: 1,
        tickPositions: [this.chartData.minValue, this.chartData.maxValue],
        minorTickInterval: this.chartData.maxValue / 6,
        minorGridLineWidth: 1,
        minorGridLineColor: '#E5E5E5',
        opposite: true
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        column: {
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
        type: 'column'
      }, {
        name: 'Emirati',
        data: emiratiData,
        color: this.chartColors.emirati,
        type: 'column'
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

    this.chart = Highcharts.chart('horizontal-bar-chart-container', chartOptions);
  }
}
