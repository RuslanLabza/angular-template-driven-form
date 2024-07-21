import { Directive, forwardRef } from "@angular/core";
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { IsAvailableValidator } from "../services/is-available-validator.service";

@Directive({
  selector: '[appIsAvailable]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => IsAvailableValidatorDirective),
      multi: true,
    },
  ],
})
export class IsAvailableValidatorDirective implements AsyncValidator {
  constructor(private validator: IsAvailableValidator) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}
