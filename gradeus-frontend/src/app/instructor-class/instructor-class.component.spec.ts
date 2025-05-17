import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorClassComponent } from './instructor-class.component';

describe('InstructorClassComponent', () => {
  let component: InstructorClassComponent;
  let fixture: ComponentFixture<InstructorClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
