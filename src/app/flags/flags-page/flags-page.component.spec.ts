import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsPageComponent } from './flags-page.component';

describe('FlagsPageComponent', () => {
  let component: FlagsPageComponent;
  let fixture: ComponentFixture<FlagsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlagsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
