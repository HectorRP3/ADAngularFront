import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeraVezPageComponent } from './primera-vez-page.component';

describe('PrimeraVezPageComponent', () => {
  let component: PrimeraVezPageComponent;
  let fixture: ComponentFixture<PrimeraVezPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeraVezPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeraVezPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
