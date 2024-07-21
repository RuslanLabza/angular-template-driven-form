import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {MockBackendInterceptor} from "./shared/mock-backend/mock-backend.interceptor";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryInputComponent } from './components/country-input/country-input.component';
import { ForbiddenCountryValidatorDirective } from './shared/directives/forbidden-country.directive';
import { IsAvailableValidatorDirective } from './shared/directives/is-available.directive';

@NgModule({
  declarations: [AppComponent, CountryInputComponent, ForbiddenCountryValidatorDirective, IsAvailableValidatorDirective],
  imports: [
    BrowserModule,
    RouterOutlet,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
