import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputReportsDynamicComponent } from './input-reports-dynamic.component';

describe('InputReportsDynamicComponent', () => {
  let component: InputReportsDynamicComponent;
  let fixture: ComponentFixture<InputReportsDynamicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputReportsDynamicComponent]
    });
    fixture = TestBed.createComponent(InputReportsDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
