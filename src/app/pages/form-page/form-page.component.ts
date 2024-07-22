import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Card } from '../../shared/interface/card';
import { FormService } from '../../services/form.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html'
})
export class FormPageComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  formCards: Card[] = [];
  invalidForms$!: Observable<Set<number>>;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.onAddCard();
    this.invalidForms$ = this.formService.invalidForms$;
  }

  onAddCard(): void {
    if(this.formCards.length) {
      const lastIndex = this.formCards[this.formCards.length - 1].index;
      this.formCards.push(this.createFormCard(lastIndex + 1));
      this.formService.addInvalidForm(lastIndex + 1);
    } else {
      this.formCards.push(this.createFormCard(0));
      this.formService.addInvalidForm(0);
    }
  }

  onRemoveCard(index: number) {
    const position = this.formCards.findIndex(card => card.index === index);
    this.formCards.splice(position, 1);
    this.formService.removeInvalidForm(index);
  }

  onSubmit(): void {
    this.formService.submitForm();
  }

  private createFormCard(index: number): Card {
    return { country: null, username: null, birthday: null, index: index };
  }
}
