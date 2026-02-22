import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Confirmed } from './confirmed';

describe('Confirmed', () => {
  let component: Confirmed;
  let fixture: ComponentFixture<Confirmed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Confirmed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Confirmed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
