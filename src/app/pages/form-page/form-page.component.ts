import {Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Card } from '../../shared/interface/card';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html'
})
export class FormPageComponent {
  @ViewChild('f') form!: NgForm;
  formCards: Card[] = [this.createFormCard()];
  invalidFormsCount = 0;
  isSubmittedForm: boolean = false;

  onAddCard(): void {
    this.formCards.push(this.createFormCard());
  }

  onRemoveCard(index: number) {
    this.formCards.splice(index, 1);
  }

  onSubmit(): void {
    this.isSubmittedForm = true;
    console.log(this.form.value)
  }

  private createFormCard(): Card {
    return { country: '', username: '', birthday: '' };
  }
}
