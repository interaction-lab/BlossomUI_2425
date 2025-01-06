// button.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {
  private apiUrl = 'http://localhost:3000/buttons';

  constructor(private http: HttpClient) { 
  }

  pressButton(buttonType: 'yes' | 'no' | 'maybe' | 'sometimes'): Observable<any> {
    console.log('Service: Button pressed:', buttonType); // Add this log
    return this.http.post(`${this.apiUrl}/press`, { buttonType });
  }
}
