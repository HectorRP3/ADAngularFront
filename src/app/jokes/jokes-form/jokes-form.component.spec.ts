import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesFormComponent } from './jokes-form.component';

describe('JokesFormComponent', () => {
  let component: JokesFormComponent;
  let fixture: ComponentFixture<JokesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
