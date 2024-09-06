import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-new-card-button',
  templateUrl: './add-new-card-button.component.html',
  styleUrl: './add-new-card-button.component.scss'
})
export class AddNewCardButtonComponent implements OnInit {
  @Output() addCard = new EventEmitter<any>();
  disabled$!: Observable<boolean>;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.disabled$ = this.formService.disabledForms$;
  }

  public onAddCard(): void {
    this.addCard.emit();
  }
}
