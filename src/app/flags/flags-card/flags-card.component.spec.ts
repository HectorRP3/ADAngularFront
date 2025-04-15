import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsCardComponent } from './flags-card.component';

describe('FlagsCardComponent', () => {
  let component: FlagsCardComponent;
  let fixture: ComponentFixture<FlagsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlagsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
