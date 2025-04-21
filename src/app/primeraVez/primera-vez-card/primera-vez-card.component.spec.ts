import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeraVezCardComponent } from './primera-vez-card.component';

describe('PrimeraVezCardComponent', () => {
  let component: PrimeraVezCardComponent;
  let fixture: ComponentFixture<PrimeraVezCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeraVezCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeraVezCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
