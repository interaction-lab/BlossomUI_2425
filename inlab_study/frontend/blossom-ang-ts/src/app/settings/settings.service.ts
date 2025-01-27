// settings.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SettingsService {
  private apiUrl = 'http://localhost:3000';

  private showSettingsSource = new BehaviorSubject<boolean>(false);
  showSettings$ = this.showSettingsSource.asObservable();

  constructor(private http: HttpClient) {}

  setBehaviorFrequency(value: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/behavior-frequency`, { frequency: value });
  }

  /*getBehaviorFrequency(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/behavior-frequency`);
  }*/

  getBehaviorFrequency(): number {
    return 100;  // Return a fixed number of seconds
  }

  toggleSettings() {
    this.showSettingsSource.next(!this.showSettingsSource.value);
  }
}