import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {

  time: number = 0;
  display?: string = '00:00:00';
  interval$!: Subscription;
  isRunning: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  //functions for the timer here...

  startTimer()
  {
    if (!this.isRunning)
    {
      this.isRunning = true;
      this.interval$ = interval(1000).subscribe(() => {
        this.time++;
        this.updateDisplay();
      });
    }
  }

  pauseTimer() {
    if (this.isRunning) {
      this.interval$.unsubscribe();
      this.isRunning = false;
    }
  }
  
  endTimer() {
    this.pauseTimer();
    this.time = 0;
    this.updateDisplay();
  }

  private updateDisplay() {
    const hours = Math.floor(this.time / 3600);
    const minutes = Math.floor((this.time % 3600) / 60);
    const seconds = this.time % 60;

    this.display = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  ngOnDestroy() {
    if (this.interval$) {
      this.interval$.unsubscribe();
    }
  }
}
