import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarLineChart } from './bar-line-chart';

describe('BarLineChart', () => {
  let component: BarLineChart;
  let fixture: ComponentFixture<BarLineChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarLineChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarLineChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
