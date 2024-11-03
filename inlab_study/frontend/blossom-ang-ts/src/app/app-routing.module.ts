import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = 
[  {path: '', redirectTo: '/landing', pathMatch: 'full' }, //default route --> landing page
   {path: 'landing', component: LandingComponent }, 
   {path :'**', redirectTo: '/landing'} //wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
