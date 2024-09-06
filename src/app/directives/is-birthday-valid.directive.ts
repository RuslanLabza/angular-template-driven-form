import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appIsBirthdayValid]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IsBirthdayValidDirective, multi: true }]
})
export class IsBirthdayValidDirective {
  validate(control: AbstractControl): ValidationErrors | null {
    return birthdayValidator()(control);
  }
}

export function birthdayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value).getTime();
    const today = new Date().getTime();

    return selectedDate <= today ? null : { invalidBirthday: true } ;
  };
}
