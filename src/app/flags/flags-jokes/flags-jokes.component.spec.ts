import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsJokesComponent } from './flags-jokes.component';

describe('FlagsJokesComponent', () => {
  let component: FlagsJokesComponent;
  let fixture: ComponentFixture<FlagsJokesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagsJokesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlagsJokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
