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
  currentRoute: string = '';

  constructor(private router: Router, 
              private settingsService: SettingsService)
  {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  isButtonDisabled(route: string): boolean {
    return this.currentRoute == route;
  }
  
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
