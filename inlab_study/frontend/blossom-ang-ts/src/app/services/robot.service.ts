// frontend/src/app/services/robot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private apiUrl = 'http://localhost:4200/api';

  constructor(private http: HttpClient) { }

  // Page-specific actions
  triggerPageAction(page: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/page-action`, { page });
  }
}