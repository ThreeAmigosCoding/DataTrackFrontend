import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCreationComponent } from './input-creation.component';

describe('InputCreationComponent', () => {
  let component: InputCreationComponent;
  let fixture: ComponentFixture<InputCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputCreationComponent]
    });
    fixture = TestBed.createComponent(InputCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
