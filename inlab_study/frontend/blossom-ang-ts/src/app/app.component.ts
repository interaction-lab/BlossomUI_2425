import { Component } from '@angular/core';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //imports: [NavSidebarComponent], //add
  //standalone: true
})
export class AppComponent {
  title = 'blossom-ang-ts';
}
