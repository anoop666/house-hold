import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  imports:[HighchartsChartModule]
})
export class DonutChartComponent {
  @Input() chartData = {
    totalVal: 0,
    data: [
      {
        name: "emirati",
        color: "#E8C97A",
        value: 20
      },
      {
        name: "nonemirati",
        color: "#748267",
        value: 80
      }
    ]
  };;

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag:boolean = false;

  constructor(private cdr:ChangeDetectorRef){}

  ngOnChanges() {
    this.updateChartOptions();
  }

  private updateChartOptions() {
    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          type: 'pie',
          name: 'Value',
          data: [
            { name: this.chartData?.data?.[1]?.name, y: this.chartData?.data?.[1]?.value, color: this.chartData?.data?.[1]?.color },
            { name: this.chartData?.data?.[0]?.name, y: this.chartData?.data?.[0]?.value, color: this.chartData?.data?.[0]?.color },
          ],
        },
      ],
    };
    this.updateFlag=true;
    this.cdr.detectChanges()
  }
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: {
      text: ' ',
    },
    tooltip: {
      enabled: true,
      pointFormat: '{series.name}: <b>{point.y}</b>',
    },
    plotOptions: {
      pie: {
        innerSize: '85%',
        dataLabels: {
          enabled: false,
        },
        borderWidth: 0
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Value',
        data: [
          { name: this.chartData?.data?.[1]?.name, y: this.chartData?.data?.[1]?.value, color: this.chartData?.data?.[1]?.color },
          { name: this.chartData?.data?.[0]?.name, y: this.chartData?.data?.[0]?.value, color: this.chartData?.data?.[0]?.color },
        ],
      },
    ],
  };
}
