import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrl: './nav-sidebar.component.css',
  standalone: true,
  imports: [RouterModule, MatIconModule]
})
export class NavSidebarComponent {

}
