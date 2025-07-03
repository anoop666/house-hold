import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwellingTile } from './dwelling-tile';

describe('DwellingTile', () => {
  let component: DwellingTile;
  let fixture: ComponentFixture<DwellingTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DwellingTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DwellingTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
