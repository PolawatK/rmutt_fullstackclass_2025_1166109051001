import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Theatercrud } from './theatercrud';

describe('Theatercrud', () => {
  let component: Theatercrud;
  let fixture: ComponentFixture<Theatercrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Theatercrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Theatercrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
