import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { StudyService } from './study.service'; // Import StudyServic
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit 
{
  showSettings = false;
  readonly INITIAL_TIME = 25 * 60; //25 minutes in seconds
  timeRemain: number = this.INITIAL_TIME; //25 minutes left --> for inlab pilot
  display?: string = '00:25:00';
  interval$!: Subscription;
  isRunning: boolean = false;
  completed_session: boolean = false;

  constructor(private studyService: StudyService, private settingsService: SettingsService) 
  {
    this.settingsService.showSettings$.subscribe(show => this.showSettings=show);
  } 

  ngOnInit(): void {
  }

  //functions for the timer:
  startTimer() {
    if (!this.isRunning) {
        this.isRunning = true;
        
        // Execute behavior immediately
        this.studyService.pressStudyButton('start').subscribe();
        
        // Start interval after behavior
        setTimeout(() => {
            this.interval$ = interval(1000).subscribe(() => {
                if (this.timeRemain > 0) {
                    this.timeRemain--;
                    this.updateDisplay();
                } else {
                    this.completed_session = true;
                    this.endTimer();
                }
            });
        }, 1000);
    }
}

  pauseTimer() {
    if (this.isRunning) {
      this.interval$.unsubscribe();
      this.isRunning = false;

      this.studyService.pressStudyButton('pause').subscribe( // Call the service
        response => {
          console.log('Pause button pressed:', response); // Log success
        },
        error => {
          console.error('Error pressing Pause button:', error); // Log error
        }
      );
    }
  }
  
  endTimer() 
  {
    this.pauseTimer();
    this.timeRemain = this.INITIAL_TIME;
    this.updateDisplay();
 
    if (this.completed_session) 
    {
        this.studyService.pressStudyButton('session_complete').subscribe
        (
            response => 
              {
                console.log('Session complete button pressed:', response); //move this inside the subscribe callback
                setTimeout(() => {
                    this.completed_session = false;
                }, 3000); //wait 3 s after the behavior completes
            },

            error => 
            {
                console.error('Error pressing Session Complete button:', error);
            }
        );
    }
 }

  private updateDisplay() {
    const hours = Math.floor(this.timeRemain / 3600);
    const minutes = Math.floor((this.timeRemain % 3600) / 60);
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
