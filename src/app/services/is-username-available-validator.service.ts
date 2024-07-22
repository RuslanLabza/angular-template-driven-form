import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { UserService } from "./user.service";

@Injectable({providedIn: 'root'})
export class IsUsernameAvailableValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.checkUsername(control.value).pipe(
      map((response) => (response.isAvailable ? null : {isAvailable: true})),
      catchError(() => of(null)),
    );
  }
}
