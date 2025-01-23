// Create new settings.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SettingsService {
  private showSettingsSource = new BehaviorSubject<boolean>(false);
  showSettings$ = this.showSettingsSource.asObservable();

  toggleSettings() {
    this.showSettingsSource.next(!this.showSettingsSource.value);
  }
}