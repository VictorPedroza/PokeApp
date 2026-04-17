import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizLevelSelectorComponent } from './quiz-level-selector-component';

describe('QuizLevelSelectorComponent', () => {
  let component: QuizLevelSelectorComponent;
  let fixture: ComponentFixture<QuizLevelSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizLevelSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizLevelSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
