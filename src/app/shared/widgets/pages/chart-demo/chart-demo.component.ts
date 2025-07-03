import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenureChartComponent, TenureChartData, ChartColors } from '../../organisms/tenure-chart/tenure-chart.component';
import { HorizontalBarChartComponent } from '../../organisms/horizontal-bar-chart/horizontal-bar-chart.component';
import { DonutChartComponent } from '../../organisms/donut-chart/donut-chart.component';

@Component({
  selector: 'app-chart-demo',
  standalone: true,
  imports: [CommonModule, TenureChartComponent, HorizontalBarChartComponent, DonutChartComponent],
  templateUrl: './chart-demo.component.html',
  styleUrls: ['./chart-demo.component.scss']
})
export class ChartDemoComponent {
  
  // Sample data matching the API response format
  tenureData: TenureChartData = {
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

  // Default chart colors matching the original design
  chartColors: ChartColors = {
    emirati: '#D4B896',
    nonEmirati: '#7A8471'
  };

  // Sample data for the horizontal bar chart (same data structure)
  horizontalBarData = {
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

  // Colors for horizontal bar chart
  horizontalBarColors = {
    emirati: '#D4A574', // Light brown/beige for Emirati
    nonEmirati: '#7A9B7E' // Green for Non-Emirati
  };

  // Sample data for the donut chart
  donutData = {
    totalVal: 180,
    data: [
      {
        name: "emirati",
        color: "#FFD700",
        value: 20
      },
      {
        name: "nonemirati",
        color: "#32CD32",
        value: 80
      }
    ]
  };

}
