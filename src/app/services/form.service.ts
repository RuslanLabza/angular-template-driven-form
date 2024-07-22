import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../shared/interface/card';
import { Country } from '../shared/enum/country';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private submittedSubject = new BehaviorSubject<boolean>(false);
  submitted$ = this.submittedSubject.asObservable();
  private invalidFormsSubject = new BehaviorSubject<Set<number>>(new Set());
  invalidForms$ = this.invalidFormsSubject.asObservable();

  submitForm(): void {
    this.submittedSubject.next(true);
  }

  resetForm(): void {
    this.submittedSubject.next(false);
  }

  addInvalidForm(index: number): void {
    this.invalidFormsSubject.next(this.invalidFormsSubject.value.add(index));
    console.log(this.invalidFormsSubject.value , index)
  }

  removeInvalidForm(index: number): void {
    let invalidForms = this.invalidFormsSubject.value;
    invalidForms.delete(index);
    this.invalidFormsSubject.next(invalidForms);
    console.log(this.invalidFormsSubject.value)
  }
}
