import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullDonutChart } from './full-donut-chart';

describe('FullDonutChart', () => {
  let component: FullDonutChart;
  let fixture: ComponentFixture<FullDonutChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullDonutChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullDonutChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
