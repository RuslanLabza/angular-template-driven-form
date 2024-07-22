import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CheckUserResponseData, SubmitFormResponseData } from '../shared/interface/responses';
import { Card } from '../shared/interface/card';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private checkUsernameUrl = environment.checkUsername;
  private submitFormUrl = environment.submitForm;


  constructor(private http: HttpClient) {}

  checkUsername(username: string): Observable<CheckUserResponseData> {
    return this.http.post<CheckUserResponseData>(this.checkUsernameUrl, {username});
  }

  submitForm(formData: {[index: number]: Card}): Observable<SubmitFormResponseData> {
    return this.http.post<SubmitFormResponseData>(this.submitFormUrl, {formData});
  }
}
