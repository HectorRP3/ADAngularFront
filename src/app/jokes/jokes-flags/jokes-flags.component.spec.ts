import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesFlagsComponent } from './jokes-flags.component';

describe('JokesFlagsComponent', () => {
  let component: JokesFlagsComponent;
  let fixture: ComponentFixture<JokesFlagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokesFlagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokesFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
