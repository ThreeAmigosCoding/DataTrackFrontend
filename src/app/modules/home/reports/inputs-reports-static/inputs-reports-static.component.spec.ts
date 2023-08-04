import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsReportsStaticComponent } from './inputs-reports-static.component';

describe('InputsReportsStaticComponent', () => {
  let component: InputsReportsStaticComponent;
  let fixture: ComponentFixture<InputsReportsStaticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputsReportsStaticComponent]
    });
    fixture = TestBed.createComponent(InputsReportsStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
