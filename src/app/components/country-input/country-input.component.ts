import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country } from '../../shared/enum/country';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrl: './country-input.component.scss',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CountryInputComponent), multi: true },
  ]
})
export class CountryInputComponent implements ControlValueAccessor {
  @Input()
  public index!: number;
  private suggestions = Object.values(Country);
  public value: string = '';
  public filteredSuggestions: Partial<Country>[] = [];
  public showSuggestions: boolean = false;
  public isDisabled: boolean = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  public ngOnInit(): void {
    this.filteredSuggestions = this.suggestions;
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.filterSuggestions();
    this.onChange(this.value);
  }

  public onBlur(): void {
    this.showSuggestions = false;
    this.onTouched();
  }

  public onFocus(): void {
    this.filterSuggestions();
  }


  public selectSuggestion(suggestion: Country): void {
    this.value = suggestion;
    this.showSuggestions = false;
    this.onChange(this.value);
    this.onTouched();
  }

  private filterSuggestions(): void {
    if (this.value) {
      this.filteredSuggestions = this.suggestions.filter((suggestion: Country) =>
        suggestion.toLowerCase().includes(this.value.toLowerCase())
      );
    } else {
      this.filteredSuggestions = this.suggestions;
    }
    this.showSuggestions = this.filteredSuggestions.length > 0;
  }
}
