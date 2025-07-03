import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import * as d3 from 'd3';

export interface HorizontalBarDatum {
  /** Display label shown on the left */
  label: string;
  /** Absolute value represented by the coloured bar */
  value: number;
  /** Total to use for the percentage calculation (optional).  If omitted the component sums all datum values. */
  total?: number;
  /** Optional custom colour; falls back to the component's palette */
  color?: string;
}

@Component({
  selector: 'app-bar-chart',
  template: '<div class="chart-container"></div>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChart implements AfterViewInit, OnChanges {
  /** Dataset rendered by the component */
  @Input() data: HorizontalBarDatum[] = [];

  /** Overall width of the SVG **(px)** */
  @Input() width = 520;
  /** Height of an individual bar **(px)** */
  @Input() barHeight = 12;
  /** Vertical gap between bars **(px)** */
  @Input() gap = 12;
  /** Render the absolute value after the bar */
  @Input() showValue = true;
  /** Render the percentage (computed using `value / total`) after the bar */
  @Input() showPercent = true;
  /** Corner‑radius for rounded bars */
  @Input() cornerRadius = 4;
  /** Background fill for the un‑filled portion of each bar */
  @Input() trackColor = '#f3f5fa';
  /** Palette used when a datum does not specify a `color` */
  @Input() palette: readonly string[] = d3.schemeTableau10;
  /** Outer margins (px) */
  @Input() margin = { top: 20, right: 80, bottom: 10, left: 10 };

  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.draw();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.svg) {
      this.draw();
    }
  }

  /** Re‑creates the chart from scratch (idempotent) */
  private draw(): void {
    const container = this.host.nativeElement.querySelector(
      '.chart-container'
    ) as HTMLElement;

    // Reset
    d3.select(container).select('svg').remove();

    // Derived values
    const total = this.getTotal();
    const innerWidth = this.width - this.margin.left - this.margin.right;
    // const innerHeight =
    //   this.data.length * this.barHeight +
    //   (this.data.length - 1) * this.gap +
    //   this.margin.top +
    //   this.margin.bottom;
    const innerHeight =
      this.data.length * this.barHeight +
      (this.data.length - 1) * this.gap +
      this.margin.top +
      this.margin.bottom;

    // Root SVG
    this.svg = d3
      .select(container)
      .append('svg')
      .attr('width', this.width)
      .attr('height', innerHeight)
      .attr('font-family', 'Inter, Roboto, Helvetica, Arial, sans-serif')
      .attr('font-size', 12);

    const bars = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Group per row
    const row = bars
      .selectAll<SVGGElement, HorizontalBarDatum>('g.row')
      .data(this.data, (d: HorizontalBarDatum) => d.label)
      .join('g')
      .attr('class', 'row')
      .attr(
        'transform',
        (d: HorizontalBarDatum, i: number) =>
          `translate(0,${i * (this.barHeight + this.gap)})`
      );

    // Background track
    row
      .append('rect')
      .attr('width', innerWidth)
      .attr('height', this.barHeight)
      .attr('fill', this.trackColor)
      .attr('rx', this.cornerRadius)
      .attr('ry', this.cornerRadius);

    // Value bar
    row
      .append('rect')
      .attr('width', (d: { value: number }) => (d.value / total) * innerWidth)
      .attr('height', this.barHeight)
      .attr(
        'fill',
        (d: HorizontalBarDatum, i: number) =>
          d.color ?? this.palette[i % this.palette.length]
      )
      .attr('rx', this.cornerRadius)
      .attr('ry', this.cornerRadius);

    // Left‑hand label
    row
      .append('text')
      .text((d) => d.label)
      .attr('dy', '-0.4em')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', '#111')
      .attr('font-weight', 600);

    // Right‑hand numeric text
    const xScale = d3.scaleLinear().domain([0, total]).range([0, innerWidth]);
    // Append percentage (top line)
row
  .append('text')
  .text(d => `${((d.value / total) * 100).toFixed(1)}%`)
  .attr('x', innerWidth + 8)
  .attr('y', this.barHeight / 2 - 6)
  .attr('text-anchor', 'start')
  .attr('fill', '#888')
  .attr('font-size', 11);

// Append value (bottom line)
row
  .append('text')
  .text(d => d.value.toLocaleString())
  .attr('x', innerWidth + 8)
  .attr('y', this.barHeight / 2 + 8)
  .attr('text-anchor', 'start')
  .attr('font-weight', 700)
  .attr('fill', '#111')
  .attr('font-size', 13);

    row
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', this.barHeight + this.gap / 2)
      .attr('y2', this.barHeight + this.gap / 2)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1);
  }

  /** Sums data or uses explicit totals (first datum's total wins) */
  private getTotal(): number {
    const explicit = this.data.find((d) => d.total != null)?.total;
    return explicit ?? d3.sum(this.data.map((d) => d.value));
  }

  private composeNumericLabel(d: HorizontalBarDatum, total: number): string {
    const parts: string[] = [];
    if (this.showPercent) {
      parts.push(`${((d.value / total) * 100).toFixed(1)}%`);
    }
    if (this.showValue) {
      parts.push(d.value.toLocaleString());
    }
    return parts.join(' ');
  }
}
