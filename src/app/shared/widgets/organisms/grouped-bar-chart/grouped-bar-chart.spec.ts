import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedBarChart } from './grouped-bar-chart';

describe('GroupedBarChart', () => {
  let component: GroupedBarChart;
  let fixture: ComponentFixture<GroupedBarChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupedBarChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupedBarChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
