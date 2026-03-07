import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showtime } from './showtime';

describe('Showtime', () => {
  let component: Showtime;
  let fixture: ComponentFixture<Showtime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Showtime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Showtime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
