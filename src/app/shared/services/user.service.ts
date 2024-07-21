import { Injectable } from '@angular/core';
import { CheckUserResponseData, SubmitFormResponseData } from '../interface/responses';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  checkUsernameUrl = '/api/checkUsername';

  constructor(private http: HttpClient) {}

  public checkUsername(username: string): Observable<CheckUserResponseData> {
    return this.http.post<CheckUserResponseData>(this.checkUsernameUrl, {username});
  }

  public submitForm(formData: Object): Observable<HttpResponse<SubmitFormResponseData>> {
    return of({ status: 200, body: { result: 'nice job' } } as any)
  }
}
