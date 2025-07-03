import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueDistributionWithProgress } from './value-distribution-with-progress';

describe('ValueDistributionWithProgress', () => {
  let component: ValueDistributionWithProgress;
  let fixture: ComponentFixture<ValueDistributionWithProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueDistributionWithProgress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueDistributionWithProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
