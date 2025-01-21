import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TricksService {
  private apiUrl = 'http://localhost:3000/tricks/press'; // Your backend URL

  constructor(private http: HttpClient) {}

  performTrick(trick: string): Observable<any> {
    return this.http.post(this.apiUrl, { buttonType: trick });
  }
}
