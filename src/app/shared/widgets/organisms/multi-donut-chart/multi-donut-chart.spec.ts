import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDonutChart } from './multi-donut-chart';

describe('MultiDonutChart', () => {
  let component: MultiDonutChart;
  let fixture: ComponentFixture<MultiDonutChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiDonutChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiDonutChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
