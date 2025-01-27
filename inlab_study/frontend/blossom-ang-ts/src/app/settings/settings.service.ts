// Create new settings.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SettingsService {
  private behaviorFrequencySource = new BehaviorSubject<number>(100); // default 100 seconds
  behaviorFrequency$ = this.behaviorFrequencySource.asObservable();

  getBehaviorFrequency(): number 
  {
    return this.behaviorFrequencySource.value;
  }

  setBehaviorFrequency(value: number) 
  {
    this.behaviorFrequencySource.next(value);
  }

  private showSettingsSource = new BehaviorSubject<boolean>(false);
  showSettings$ = this.showSettingsSource.asObservable();

  toggleSettings() {
    this.showSettingsSource.next(!this.showSettingsSource.value);
  }
}