import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookingcrud } from './bookingcrud';

describe('Bookingcrud', () => {
  let component: Bookingcrud;
  let fixture: ComponentFixture<Bookingcrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookingcrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookingcrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
