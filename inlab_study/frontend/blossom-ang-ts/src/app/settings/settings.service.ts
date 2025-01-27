// settings.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map operator from RxJS

@Injectable({providedIn: 'root'})
export class SettingsService {
  private apiUrl = 'http://localhost:3000';

  private showSettingsSource = new BehaviorSubject<boolean>(false);
  showSettings$ = this.showSettingsSource.asObservable();

  constructor(private http: HttpClient) {}

  setBehaviorFrequency(value: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/behavior-frequency`, { frequency: value });
  }

  // Get all settings for the user and extract behaviorFrequency
  getBehaviorFrequency(userId: number): Observable<number> {
    return this.http.get<{ behaviorFrequency: number }>(`${this.apiUrl}/get-settings/${userId}`).pipe(
      map((settings) => settings.behaviorFrequency) // Extract behaviorFrequency
    );
  }

  /*getBehaviorFrequency(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/behavior-frequency`);
  }*/

  /*getBehaviorFrequency(): number {
    return 100;  // Return a fixed number of seconds
  }*/

  toggleSettings() {
    this.showSettingsSource.next(!this.showSettingsSource.value);
  }
}