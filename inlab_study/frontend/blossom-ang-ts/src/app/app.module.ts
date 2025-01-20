import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SettingsComponent } from './settings/settings.component';
import { ButtonComponent } from './button/button.component';
import { StudyComponent } from './study/study.component';
import { TricksComponent } from './tricks/tricks.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SettingsComponent,
    ButtonComponent,
    StudyComponent,
    TricksComponent,
    NavSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule,
    HttpClientModule,
    MatIconModule
  ],
  exports: [
    SettingsComponent
  ],
  providers: [], //add services here
  bootstrap: [AppComponent]
})

export class AppModule { }