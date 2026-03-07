import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mybooking } from './mybooking';

describe('Mybooking', () => {
  let component: Mybooking;
  let fixture: ComponentFixture<Mybooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mybooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mybooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
