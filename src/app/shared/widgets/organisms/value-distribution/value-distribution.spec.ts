import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueDistribution } from './value-distribution';

describe('ValueDistribution', () => {
  let component: ValueDistribution;
  let fixture: ComponentFixture<ValueDistribution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueDistribution]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueDistribution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
