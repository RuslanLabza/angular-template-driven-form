import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of, switchMap, delay } from "rxjs";
import { UserService } from "./user.service";

@Injectable({providedIn: 'root'})
export class IsUsernameAvailableValidatorService implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(100), //The delay operator was used to wait until the user finishes typing, instead of debounceTime(), as debounceTime() does not work in this case.
      switchMap((value) => this.userService.checkUsername(value).pipe(
        map((response) => (response.isAvailable ? null : {isAvailable: true})),
        catchError(() => of(null))
      )),
    );
  }
}
