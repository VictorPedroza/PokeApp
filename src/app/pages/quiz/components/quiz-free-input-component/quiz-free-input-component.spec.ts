import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFreeInputComponent } from './quiz-free-input-component';

describe('QuizFreeInputComponent', () => {
  let component: QuizFreeInputComponent;
  let fixture: ComponentFixture<QuizFreeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizFreeInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizFreeInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
