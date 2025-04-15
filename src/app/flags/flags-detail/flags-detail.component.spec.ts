import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsDetailComponent } from './flags-detail.component';

describe('FlagsDetailComponent', () => {
  let component: FlagsDetailComponent;
  let fixture: ComponentFixture<FlagsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlagsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
