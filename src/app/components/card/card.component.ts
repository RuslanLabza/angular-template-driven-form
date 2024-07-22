import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Card } from '../../shared/interface/card';
import { ControlContainer, NgForm, NgModel } from '@angular/forms';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { FormService } from '../../services/form.service';
import { TextConstants } from '../../shared/constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() index!: number;
  @Input() formCard!: Card;
  @Output() removeCard = new EventEmitter<number>();
  private subscription!: Subscription;
  disabled$!: Observable<boolean>;
  textConstants = TextConstants;

  @ViewChild('country') country!: NgModel;
  @ViewChild('username') username!: NgModel;
  @ViewChild('birthday') birthday!: NgModel;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.disabled$ = this.formService.disabledForms$;
  }

  ngAfterViewInit(): void {
    this.subscription = combineLatest(this.country.statusChanges!, this.username.statusChanges!, this.birthday.statusChanges!).subscribe(
      () => {
        if(this.country.invalid || this.username.invalid || this.birthday.invalid) {
          this.formService.addInvalidForm(this.index);
        } else {
          this.formService.removeInvalidForm(this.index);
        }
      })
  }

  public onRemoveCard(): void {
    this.removeCard.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
