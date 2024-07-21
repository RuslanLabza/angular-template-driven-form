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
  public isSubmittedForm: boolean = false;

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
      username: [null, {updateOn: 'blur'}],
      birthday: [null],
    })
  }

  public onSubmit(): void {
    this.isSubmittedForm = true;
    console.log(this.pageForm.controls['cards'])
  }

  public isErrorShown(prop: 'country' | 'username', index: number): boolean | undefined {
    return this.formCardGroups[index].get(prop)?.invalid && (this.formCardGroups[index].get(prop)?.touched || this.isSubmittedForm);
  }

  public isPendingShown(index: number): boolean {
    return Boolean(this.formCardGroups[index].get('username')?.pending) && (this.formCardGroups[index].get('username')?.touched || this.isSubmittedForm);
  }

  public countInvalidControls(formGroup: FormGroup | FormArray): number {
    let invalidCount = 0;
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        invalidCount += this.countInvalidControls(control);
      } else if (control && control.invalid && (control.touched || this.isSubmittedForm)) {
        invalidCount++;
      }
    });
    return invalidCount;
  }
}
