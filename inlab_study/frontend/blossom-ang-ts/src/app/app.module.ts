import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // Use this instead of HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SettingsComponent } from './settings/settings.component';
import { ButtonComponent } from './button/button.component';
import { NumericKeypadComponent } from './numeric-keypad/numeric-keypad.component';
import { StudyComponent } from './study/study.component';
import { TricksComponent } from './tricks/tricks.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { LedService } from './settings/led.service';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SettingsComponent,
    ButtonComponent,
    StudyComponent,
    TricksComponent,
    NumericKeypadComponent,
    NavSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule,
    MatIconModule,
    FormsModule,
  ],
  exports: [
    SettingsComponent
  ],
  providers: [
    provideHttpClient(), LedService, provideAnimationsAsync()
  ], //services only need to be declared here
  bootstrap: [AppComponent]
})

export class AppModule { }