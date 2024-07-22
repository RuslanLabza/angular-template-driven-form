import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { Country } from "../shared/enum/country";

@Directive({
  selector: '[appIsCountryValid]',
  providers: [{provide: NG_VALIDATORS, useExisting: IsCountryValidDirective, multi: true}],
})
export class IsCountryValidDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return countryValidator()(control);
  }
}

export function countryValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isCountryValid = Object.values(Country).includes(control.value);
    return isCountryValid ? null : {isCountryValid: {value: control.value}};
  };
}
