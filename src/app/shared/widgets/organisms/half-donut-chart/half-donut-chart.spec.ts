import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfDonutChart } from './half-donut-chart';

describe('HalfDonutChart', () => {
  let component: HalfDonutChart;
  let fixture: ComponentFixture<HalfDonutChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HalfDonutChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalfDonutChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
