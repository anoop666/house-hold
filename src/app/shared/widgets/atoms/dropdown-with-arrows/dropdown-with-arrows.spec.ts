import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownWithArrows } from './dropdown-with-arrows';

describe('DropdownWithArrows', () => {
  let component: DropdownWithArrows;
  let fixture: ComponentFixture<DropdownWithArrows>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownWithArrows]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownWithArrows);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
