import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorTopicComponent } from './instructor-topic.component';

describe('InstructorTopicComponent', () => {
  let component: InstructorTopicComponent;
  let fixture: ComponentFixture<InstructorTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
