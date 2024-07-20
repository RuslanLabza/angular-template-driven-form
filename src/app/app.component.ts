import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CheckUserResponseData} from "./shared/interface/responses";
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public pageForm!: FormGroup;
  public get formCardGroups() {
    return (<FormArray>this.pageForm.get('cards')).controls;
  }
  private isSubmittedForm: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.pageForm =  this.fb.group({
      cards: this.fb.array([this.createForm()])
    });
  }

  public onAddForm(): void {
    (<FormArray>this.pageForm.get('cards')).push(this.createForm());
  }

  public onRemoveForm(formIndex: number): void {
    (<FormArray>this.pageForm.get('cards')).removeAt(formIndex);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      country: [null],
      username: [null],
      birthday: [null],
    })
  }

  public onSubmit(): void {
    this.isSubmittedForm = true;
    console.log(this.pageForm.controls['cards'])
  }

  public isCountryErrorShown(index: number): boolean | undefined {
    return !this.formCardGroups[index].get('country')?.valid && (this.formCardGroups[index].get('country')?.touched || this.isSubmittedForm);
  }

    // just an example, you are free to move it anywhere
    checkUser(username: string): Observable<CheckUserResponseData> {
      return this.http.post<CheckUserResponseData>('/api/checkUsername1', {username});
    }
}
