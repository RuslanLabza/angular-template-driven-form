import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../shared/interface/card';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CardComponent {
  @Input() index!: number;
  @Input() formCard!: Card;
  @Output() removeCard = new EventEmitter<number>();

  public onRemoveCard(): void {
    this.removeCard.emit();
  }

  //! Move to form service
  public isErrorShown(prop: 'country' | 'username', index: number): boolean | undefined {
    // return this.formCardGroups[index].get(prop)?.invalid && (this.formCardGroups[index].get(prop)?.touched || this.isSubmittedForm);
    return false;
  }

  //! Move to form service
  public isPendingShown(index: number): boolean {
    // return Boolean(this.formCardGroups[index].get('username')?.pending) && (this.formCardGroups[index].get('username')?.touched || this.isSubmittedForm);
    return false;
  }
}
