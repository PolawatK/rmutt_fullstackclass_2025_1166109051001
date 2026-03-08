import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paymentcrud } from './paymentcrud';

describe('Paymentcrud', () => {
  let component: Paymentcrud;
  let fixture: ComponentFixture<Paymentcrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paymentcrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paymentcrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
