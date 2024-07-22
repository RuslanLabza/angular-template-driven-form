import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CheckUserResponseData, SubmitFormResponseData } from '../shared/interface/responses';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  checkUsernameUrl = '/api/checkUsername';

  constructor(private http: HttpClient) {}

  checkUsername(username: string): Observable<CheckUserResponseData> {
    return this.http.post<CheckUserResponseData>(this.checkUsernameUrl, {username});
  }

  submitForm(formData: Object): Observable<HttpResponse<SubmitFormResponseData>> {
    return of({ status: 200, body: { result: 'nice job' } } as any)
  }
}
