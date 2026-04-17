import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-free-input-component',
  standalone: false,
  templateUrl: './quiz-free-input-component.html',
})
export class QuizFreeInputComponent {
  @Input() answered = false;
  @Output() submitted = new EventEmitter<string>();

  answer = '';

  ngOnChanges(): void {
    // Limpa o campo quando uma nova rodada começa
    if (!this.answered) this.answer = '';
  }

  submit(): void {
    if (!this.answer.trim() || this.answered) return;
    this.submitted.emit(this.answer.trim());
  }
}
