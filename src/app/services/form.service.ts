import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private disabledFormSubject = new BehaviorSubject<boolean>(false);
  private invalidFormsSubject = new BehaviorSubject<Set<number>>(new Set());
  invalidForms$ = this.invalidFormsSubject.asObservable();
  disabledForms$ = this.disabledFormSubject.asObservable();

  resetForm(): void {
    this.invalidFormsSubject.next(new Set());
  }

  disableForm(): void {
    this.disabledFormSubject.next(true);
  }

  enableForm(): void {
    this.disabledFormSubject.next(false);
  }

  addInvalidForm(index: number): void {
    this.invalidFormsSubject.next(this.invalidFormsSubject.value.add(index));
  }

  removeInvalidForm(index: number): void {
    const invalidForms = this.invalidFormsSubject.value;
    invalidForms.delete(index);
    this.invalidFormsSubject.next(invalidForms);
  }
}
