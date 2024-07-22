import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country } from '../../shared/enum/country';
import { TextConstants } from '../../shared/constants';

// 1. Debounce time was not added for the country input because the data is static and does not require backend calls.
// 2. There is information about the /api/regions endpoint in the documentation, but it is not implemented in the mock backend.
// Therefore, the input that uses the Country enum to display the data was created.
@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CountryInputComponent), multi: true },
  ]
})
export class CountryInputComponent implements ControlValueAccessor {
  @Input() index!: number;

  private suggestions = Object.values(Country);
  value: string = '';
  filteredSuggestions: Partial<Country>[] = [];
  showSuggestions: boolean = false;
  isDisabled: boolean = false;
  textConstants = TextConstants;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.filteredSuggestions = this.suggestions;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.filterSuggestions();
    this.onChange(this.value);
  }

  onBlur(): void {
    this.showSuggestions = false;
    this.onTouched();
  }

  onFocus(): void {
    this.filterSuggestions();
  }

  selectSuggestion(suggestion: Country): void {
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
