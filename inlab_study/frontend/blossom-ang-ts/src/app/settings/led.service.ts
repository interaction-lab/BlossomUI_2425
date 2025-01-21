// led.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ColorPreferences {
  red: boolean;
  orange: boolean;
  yellow: boolean;
  green: boolean;
  blue: boolean;
  purple: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LedService {
  private apiUrl = 'http://localhost:3000/led';

  constructor(private http: HttpClient) { }

  updateLedColors(colors: ColorPreferences): Observable<any> {
    return this.http.post(`${this.apiUrl}/colors`, colors);
  }

  getLedColors(): Observable<ColorPreferences> {
    return this.http.get<ColorPreferences>(`${this.apiUrl}/colors`);
  }
}