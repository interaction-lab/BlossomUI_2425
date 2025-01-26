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
  readonly INITIAL_TIME = 25 * 60;
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
  startTimer()
  {
    if (!this.isRunning)
    {
      this.isRunning = true;
      this.studyService.pressStudyButton('start').subscribe( // Call the service
        response => {
          console.log('Start button pressed:', response); // Log success
        },
        error => {
          console.error('Error pressing Start button:', error); // Log error
        }
      );

      this.interval$ = interval(1000).subscribe(() => {
        if (this.timeRemain > 0) {
          this.timeRemain--;
          this.updateDisplay();
        } else {
          this.completed_session = true;
          this.endTimer();
        }
      });
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
  
  endTimer() {
    this.pauseTimer();
    this.timeRemain = this.INITIAL_TIME; //start from the highest, end at lowest
    this.updateDisplay();

    if(this.completed_session){
      this.studyService.pressStudyButton('session_complete').subscribe( // Call the service
        response => {
          console.log('Session completed:', response); // Log success
          this.completed_session = false;
        },
        error => {
          console.error('Error pressing Session Completed:', error); // Log error
        }
      );
    }

    this.studyService.pressStudyButton('end').subscribe( // Call the service
      response => {
        console.log('End button pressed:', response); // Log success
      },
      error => {
        console.error('Error pressing End button:', error); // Log error
      }
    );
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
