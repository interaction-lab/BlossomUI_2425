// participant-id.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Make this service available globally
})
export class ParticipantIdService {
  private participantIdSubject = new BehaviorSubject<string>('');
  participantId$ = this.participantIdSubject.asObservable();

  constructor() {}

  getParticipantId(): string {
    return this.participantIdSubject.value;
  }

  setParticipantId(id: string): void {
    this.participantIdSubject.next(id);
  }
}
