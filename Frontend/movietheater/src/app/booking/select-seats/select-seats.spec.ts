import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSeats } from './select-seats';

describe('SelectSeats', () => {
  let component: SelectSeats;
  let fixture: ComponentFixture<SelectSeats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSeats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSeats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
