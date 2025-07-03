import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialMultiGauge } from './radial-multi-gauge';

describe('RadialMultiGauge', () => {
  let component: RadialMultiGauge;
  let fixture: ComponentFixture<RadialMultiGauge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadialMultiGauge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadialMultiGauge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
