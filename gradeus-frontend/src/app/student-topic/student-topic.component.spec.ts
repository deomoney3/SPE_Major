import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTopicComponent } from './student-topic.component';

describe('StudentTopicComponent', () => {
  let component: StudentTopicComponent;
  let fixture: ComponentFixture<StudentTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
