import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//include the interface for audio preferences
interface AudioPreferences
{
  animalSounds: boolean;
  digitalSounds: boolean;
  hybridSounds: boolean;
  vocalizations: boolean;
}

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

  setAudioPreferences(preferences: AudioPreferences): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/audio-preferences`, preferences);
  }

  getAudioPreferences(): Observable<AudioPreferences> {
    return this.http.get<AudioPreferences>(`${this.apiUrl}/audio-preferences`);
  }
}