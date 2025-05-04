import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesCardComponent } from './types-card.component';

describe('TypesCardComponent', () => {
  let component: TypesCardComponent;
  let fixture: ComponentFixture<TypesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
