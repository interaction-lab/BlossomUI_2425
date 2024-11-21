// src/app/services/robot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  //fix the IP format - remove /24
  private apiUrl = 'http://192.168.1.140:5000/api';

  constructor(private http: HttpClient) { }

  activateMode(mode: string) {
    return this.http.post(`${this.apiUrl}/mode/${mode}`, {}).subscribe(
      response => console.log(`${mode} mode activated`),
      error => console.error('Error:', error)
    );
  }
  
  setMode(mode: string) {
    return this.http.post(`${this.apiUrl}/mode/${mode}`, {});
  }
}