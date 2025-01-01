import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrightnessService {
  private apiUrl = 'http://localhost:3000/brightness'; //express server endpoint

  constructor(private http: HttpClient) { }

  setBrightness(value: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/set`, { brightness: value });
  }

  getBrightness(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get`);
  }
}