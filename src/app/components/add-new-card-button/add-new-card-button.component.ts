import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-card-button',
  templateUrl: './add-new-card-button.component.html',
  styleUrl: './add-new-card-button.component.scss'
})
export class AddNewCardButtonComponent {
  @Output() addCard = new EventEmitter<any>();

  public onAddCard(): void {
    this.addCard.emit();
  }
}
