import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {
  private apiUrl = 'http://localhost:3000/volume';

  constructor(private http: HttpClient) { }

  setVolume(value: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/set`, { volume: value });
  }

  getVolume(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get`);
  }
}