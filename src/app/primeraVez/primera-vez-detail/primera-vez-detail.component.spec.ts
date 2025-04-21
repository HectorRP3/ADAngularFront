import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeraVezDetailComponent } from './primera-vez-detail.component';

describe('PrimeraVezDetailComponent', () => {
  let component: PrimeraVezDetailComponent;
  let fixture: ComponentFixture<PrimeraVezDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeraVezDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeraVezDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
