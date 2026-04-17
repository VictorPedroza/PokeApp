import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizHeaderComponent } from './components/quiz-header-component/quiz-header-component';
import { FormsModule } from '@angular/forms';
import { QuizComponent } from './quiz-component';
import { QuizLevelSelectorComponent } from './components/quiz-level-selector-component/quiz-level-selector-component';
import { QuizCardComponent } from './components/quiz-card-component/quiz-card-component';
import { QuizOptionComponent } from './components/quiz-option-component/quiz-option-component';
import { QuizFreeInputComponent } from './components/quiz-free-input-component/quiz-free-input-component';
import { QuizFeedbackComponent } from './components/quiz-feedback-component/quiz-feedback-component';
import { QuizResultComponent } from './components/quiz-result-component/quiz-result-component';
import { QuizRoutingModule } from './quiz-routing-module';
import { QuizService } from './services/quiz-service';

@NgModule({
  declarations: [
    QuizComponent,
    QuizHeaderComponent,
    QuizLevelSelectorComponent,
    QuizCardComponent,
    QuizOptionComponent,
    QuizFreeInputComponent,
    QuizFeedbackComponent,
    QuizResultComponent,
  ],
  imports: [CommonModule, FormsModule, QuizRoutingModule],
  providers: [QuizService]
})
export class QuizModule {}
