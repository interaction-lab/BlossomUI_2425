import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit 
{
  readonly INITIAL_TIME = 25 * 60;
  timeRemain: number = this.INITIAL_TIME; //25 minutes left --> for inlab pilot
  display?: string = '00:25:00';
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
      this.interval$ = interval(1000).subscribe(() => 
      {
        if (this.timeRemain > 0)
        {
          this.timeRemain--;
          this.updateDisplay();
        }

        else
        {
          this.pauseTimer();
        }
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
    this.timeRemain = this.INITIAL_TIME; //start from the highest, end at lowest
    this.updateDisplay();
  }

  private updateDisplay() {
    const hours = Math.floor(this.timeRemain / 3600);
    const minutes = Math.floor(this.timeRemain / 60);
    const seconds = this.timeRemain % 60;

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
