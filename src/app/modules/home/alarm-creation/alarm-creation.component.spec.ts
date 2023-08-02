import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmCreationComponent } from './alarm-creation.component';

describe('AlarmCreationComponent', () => {
  let component: AlarmCreationComponent;
  let fixture: ComponentFixture<AlarmCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmCreationComponent]
    });
    fixture = TestBed.createComponent(AlarmCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
