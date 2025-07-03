import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TornadoChart } from './tornado-chart';

describe('TornadoChart', () => {
  let component: TornadoChart;
  let fixture: ComponentFixture<TornadoChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TornadoChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TornadoChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
