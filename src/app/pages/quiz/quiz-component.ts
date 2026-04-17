// quiz-component.ts
import { ChangeDetectorRef, Component } from '@angular/core';
import { Pokemon } from '../../shared/consants/pokemon/Pokemon';
import { QuizService } from './services/quiz-service';
import { QuizLevel } from './constants/Quiz';

@Component({
  selector: 'app-quiz-component',
  standalone: false,
  templateUrl: './quiz-component.html',
})
export class QuizComponent {
  quizStarted = false;

  constructor(
    public quizService: QuizService,
    private cdr: ChangeDetectorRef,
  ) {}

  onLevelChange(level: QuizLevel): void {
    this.quizService.setLevel(level);
  }

  startQuiz(): void {
    this.quizStarted = true;
    this.quizService.startQuiz();
    this._loadRound();
  }

  quit(): void {
    this.quizStarted = false;
    this.quizService.startQuiz();
    this.cdr.detectChanges();
  }

  onOptionSelected(pokemon: Pokemon): void {
    this.quizService.selectAnswer(pokemon);
    this.cdr.detectChanges();
  }

  onFreeAnswer(answer: string): void {
    if (!this.quizService.round) return;
    this.quizService.round.freeAnswer = answer;
    this.quizService.submitFreeAnswer();
    this.cdr.detectChanges();
  }

  onNext(): void {
    this.quizService.next();
    if (this.quizService.state === 'playing') {
      this._loadRound();
    }
    this.cdr.detectChanges();
  }

  onRestart(): void {
    this.quizStarted = false;
    this.quizService.startQuiz();
    this.cdr.detectChanges();
  }

  private _loadRound(): void {
    this.quizService.loadRound().subscribe({
      next: () => this.cdr.detectChanges(),
      error: () => this.cdr.detectChanges(),
    });
  }
}
