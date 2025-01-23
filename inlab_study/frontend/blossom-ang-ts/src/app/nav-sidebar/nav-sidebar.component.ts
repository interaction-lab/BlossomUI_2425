import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.css']
})
export class NavSidebarComponent implements OnInit {
  showSettingsButton = false;

  constructor(private router: Router, 
              private settingsService: SettingsService) 
  {}

  toggleSettings() {
    this.settingsService.toggleSettings();
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showSettingsButton = event.url === '/study';
    });
  }
}
