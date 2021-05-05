import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNewModalComponent } from './task-new-modal.component';

describe('ContactNewModalComponent', () => {
  let component: TaskNewModalComponent;
  let fixture: ComponentFixture<TaskNewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskNewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
