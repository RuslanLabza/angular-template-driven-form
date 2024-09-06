import { Directive, forwardRef } from "@angular/core";
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { IsUsernameAvailableValidatorService } from "../services/is-username-available-validator.service";

@Directive({
  selector: '[appIsUsernameAvailable]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => IsUsernameAvailableDirective), multi: true}],
})
export class IsUsernameAvailableDirective implements AsyncValidator  {
  constructor(private validator: IsUsernameAvailableValidatorService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}
