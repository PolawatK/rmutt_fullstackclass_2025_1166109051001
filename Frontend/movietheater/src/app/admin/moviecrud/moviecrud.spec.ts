import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Moviecrud } from './moviecrud';

describe('Moviecrud', () => {
  let component: Moviecrud;
  let fixture: ComponentFixture<Moviecrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Moviecrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Moviecrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
