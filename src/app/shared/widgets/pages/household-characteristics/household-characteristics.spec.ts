import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdCharacteristics } from './household-characteristics';

describe('HouseholdCharacteristics', () => {
  let component: HouseholdCharacteristics;
  let fixture: ComponentFixture<HouseholdCharacteristics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseholdCharacteristics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseholdCharacteristics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
