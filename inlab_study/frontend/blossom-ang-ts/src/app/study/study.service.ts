// study.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParticipantIdService } from '../button/participant-id.service';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private apiUrl = 'http://localhost:3000/study_buttons'; // Updated API endpoint

  constructor(
    private http: HttpClient, 
    private participantIdService: ParticipantIdService
  ) {}

  pressStudyButton(buttonType: 'start' | 'pause' | 'end' | 'session_complete'): Observable<any> {
    const participantId = this.participantIdService.getParticipantId();
    if (!participantId) {
      console.error('No participant ID set');
    }
    console.log('Service: Study button pressed:', { buttonType, participantId });
    return this.http.post(`${this.apiUrl}/press`, { buttonType, participantId });
  }
}
