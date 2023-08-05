import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAlarmsComponent } from './reports-alarms.component';

describe('ReportsAlarmsComponent', () => {
  let component: ReportsAlarmsComponent;
  let fixture: ComponentFixture<ReportsAlarmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsAlarmsComponent]
    });
    fixture = TestBed.createComponent(ReportsAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
