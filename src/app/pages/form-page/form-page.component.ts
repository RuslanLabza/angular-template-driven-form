import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Card } from '../../shared/interface/card';
import { FormService } from '../../services/form.service';
import { Observable, Subscription, interval } from 'rxjs';
import { UserService } from '../../services/user.service';
import { TextConstants } from '../../shared/constants';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html'
})
export class FormPageComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  formCards: Card[] = [];
  invalidForms$!: Observable<Set<number>>;
  timer: number = 0;
  textConstants = TextConstants;
  submitButtonText: string = this.textConstants.BUTTONS.SUBMIT_FORMS;
  private subscription!: Subscription;
  private intervalSubscription!: Subscription;

  constructor(private formService: FormService, private userService: UserService) {}

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
    if (this.timer > 0) {
      this.cancelSubmission();
    } else {
      this.startSubmission();
    }
  }

  startSubmission(): void {
    this.formService.disableForm();
    this.timer = 5;
    this.submitButtonText = this.textConstants.BUTTONS.CANCEL;
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.timer--;
      if (this.timer === 0) {
        this.submitForms();
      }
    });
  }

  cancelSubmission(): void {
    this.timer = 0;
    this.submitButtonText = this.textConstants.BUTTONS.SUBMIT_FORMS;
    this.formService.enableForm();
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  submitForms(): void {
      this.subscription = this.userService.submitForm(<{[index: number]: Card}>this.form.value).subscribe(() => {
        this.form.reset();
        this.formService.resetForm();
        this.formCards = [];
        this.onAddCard();
        this.cancelSubmission();
      })
  }

  private createFormCard(index: number): Card {
    return { country: null, username: null, birthday: null, index: index };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
