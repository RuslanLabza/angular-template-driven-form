import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {MockBackendInterceptor} from "./shared/mock-backend/mock-backend.interceptor";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CountryInputComponent } from './components/country-input/country-input.component';
import { CardComponent } from './components/card/card.component';
import { AddNewCardButtonComponent } from './components/add-new-card-button/add-new-card-button.component';
import { IsCountryValidDirective } from './directives/is-country-valid.directive';
import { IsUsernameAvailableDirective } from './directives/is-username-available.directive';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormPageComponent,
    CardComponent,
    AddNewCardButtonComponent,
    CountryInputComponent,
    IsCountryValidDirective,
    IsUsernameAvailableDirective,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
