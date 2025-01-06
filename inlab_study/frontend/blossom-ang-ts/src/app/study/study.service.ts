// study.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private apiUrl = 'http://localhost:3000/study_buttons'; // Updated API endpoint

  constructor(private http: HttpClient) { 
  }

  pressStudyButton(buttonType: 'start' | 'pause' | 'end'): Observable<any> {
    console.log('Service: Study button pressed:', buttonType); // Log for debugging
    return this.http.post(`${this.apiUrl}/press`, { buttonType });
  }
}
