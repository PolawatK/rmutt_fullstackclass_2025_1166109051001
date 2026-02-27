import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBooking } from './total-booking';

describe('TotalBooking', () => {
  let component: TotalBooking;
  let fixture: ComponentFixture<TotalBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalBooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
