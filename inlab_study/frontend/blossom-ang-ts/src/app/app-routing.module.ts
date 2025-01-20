import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { StudyComponent } from './study/study.component';
import { ButtonComponent } from './button/button.component';
import { SettingsComponent } from './settings/settings.component';
import { TricksComponent } from './tricks/tricks.component';
//navbar not added here bc not a route itself

const routes: Routes = 
[  {path: '', redirectTo: '/landing', pathMatch: 'full' }, //default route --> landing page
   {path: 'landing', component: LandingComponent }, 
   {path: 'study', component: StudyComponent },
   {path: 'training', component: ButtonComponent},
   {path: 'settings', component: SettingsComponent},
   {path: 'tricks', component: TricksComponent},
   {path :'**', redirectTo: '/landing'} //wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
