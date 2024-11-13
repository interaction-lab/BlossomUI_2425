import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SettingsComponent } from './settings/settings.component';
import { StudyComponent } from './study/study.component';
import { TrainingComponent } from './training/training.component';
import { ExtraComponent } from './extra/extra.component';
import { RobotService } from './services/robot.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SettingsComponent,
    StudyComponent,
    TrainingComponent,
    ExtraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [RobotService], //add services here
  bootstrap: [AppComponent]
})

export class AppModule { }