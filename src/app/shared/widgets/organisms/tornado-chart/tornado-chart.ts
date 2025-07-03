import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-tornado-chart',
  imports: [],
  templateUrl: './tornado-chart.html',
  styleUrls: ['./tornado-chart.scss'],
  standalone: true,
})
export class TornadoChart implements OnInit {
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;

  private data = [
    {
      category: 'Housing, water, electricity, gas and other fuels',
      value: 66300,
      color: '#4ddbe6',
    },
    {
      category: 'Food and non- alcoholic beverages',
      value: 23000,
      color: '#3fc4d6',
    },
    { category: 'Clothing and Footwear', value: 11700, color: '#2fa6c2' },
    {
      category: 'Fixtures and fittings, household equipment, ..',
      value: 13800,
      color: '#3796a9',
    },
    {
      category: 'Alcoholic Beverages and Tobacco',
      value: 2950,
      color: '#1b3455',
    },
    { category: 'Health', value: 8200, color: '#20496f' },
    { category: 'Transportation', value: 32000, color: '#285375' },
    {
      category: 'Information and Communication',
      value: 11215,
      color: '#3b766c',
    },
    { category: 'Recreation and culture', value: 18200, color: '#4e8c75' },
    { category: 'Education', value: 39100, color: '#67a586' },
    { category: 'Restaurants and hotels', value: 10200, color: '#77b894' },
    {
      category: 'Insurance and Financial Services',
      value: 1920,
      color: '#9bcaa7',
    },
    {
      category: 'Miscellaneous goods and services',
      value: 16980,
      color: '#afd6b7',
    },
  ];

  ngOnInit() {
    this.createChart();
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    const margin = { top: 20, right: 100, bottom: 20, left: 250 };
    const width = 450 - margin.left - margin.right;
    const height = this.data.length * 20;

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .style('background', 'none')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(this.data.map((d) => d.category))
      .padding(0);

    const x = d3
      .scaleLinear()
      .range([0, width / 2])
      .domain([0, d3.max(this.data, (d) => d.value)!]);

    // Draw centerline

    svg
      .append('line')

      .attr('x1', width / 2)

      .attr('x2', width / 2)

      .attr('y1', 0)

      .attr('y2', y(this.data[this.data.length - 2].category)! + y.bandwidth())

      .attr('stroke', '#ccc')

      .attr('stroke-dasharray', '2');

    // Draw trapezoidal bars

    svg
      .selectAll('path')

      .data(this.data.slice(0, -1))

      .enter()

      .append('path')

      .attr('d', (d, i) => {
        const barHeight = y.bandwidth();
        const centerX = width / 2;
        const topWidth = x(this.data[i].value);
        const yTop = y(this.data[i].category)!;
        const yBottom = yTop + barHeight;
        let bottomWidth = 0;
        if (i < this.data.length - 1) {
          bottomWidth = x(this.data[i + 1].value);
        } else {
          bottomWidth = 0; // Last bar tapers to a point
        }
        return `
          M${centerX - topWidth},${yTop}
          L${centerX + topWidth},${yTop}
          L${centerX + bottomWidth},${yBottom}
          L${centerX - bottomWidth},${yBottom}
          Z
        `;
      })

      .attr('fill', (d) => d.color);

    // Define positions for label, line, and value
    const labelX = -30; // left label position
    const lineStartX = 120; // start of the line (adjust as needed)
    const lineEndX = width - 60; // end of the line (adjust as needed)
    const valueX = width + 30; // right value position

    // Define centerX for grid lines
    const centerX = width / 2;

    // Find the maximum value for the largest bar
    const maxValue = d3.max(this.data, (d) => d.value)!;
    const maxBarWidth = x(maxValue);

    // Draw horizontal grid lines for each value, all with the same length as the largest bar
    svg
      .selectAll('.bar-line')
      .data(this.data)
      .enter()
      .append('line')
      .attr('class', 'bar-line')
      .attr('x1', centerX - maxBarWidth)
      .attr('x2', centerX + maxBarWidth)
      .attr('y1', (d) => y(d.category)!)
      .attr('y2', (d) => y(d.category)!)
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', 0.8)
      .attr('stroke-linecap', 'round');

    // Remove previous category labels and values
    svg.selectAll('.category-label').remove();
    svg.selectAll('.value-label').remove();

    // Add category labels, aligned with the top grid line of each bar
    svg
      .selectAll('.category-label')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'category-label')
      .attr('x', labelX)
      .attr('y', (d) => y(d.category)!)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .text((d) => d.category)
      .style('font-size', '15px');

    // Add values, aligned with the top grid line of each bar
    svg
      .selectAll('.value-label')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('x', valueX)
      .attr('y', (d) => y(d.category)!)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'start')
      .text((d) => d.value.toLocaleString())
      .style('font-weight', 'bold')
      .style('font-size', '15px');
  }
}
