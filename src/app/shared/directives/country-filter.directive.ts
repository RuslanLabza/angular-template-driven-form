import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { Country } from "../enum/country";

@Directive({
  selector: '[appForbiddenCountry]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenCountryValidatorDirective, multi: true}],
})
export class ForbiddenCountryValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return forbiddenCountryValidator()(control);
  }
}

export function forbiddenCountryValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !Object.values(Country).includes(control.value);
    console.log(forbidden)
    return forbidden ? {forbiddenCountry: {value: control.value}} : null;
  };
}
