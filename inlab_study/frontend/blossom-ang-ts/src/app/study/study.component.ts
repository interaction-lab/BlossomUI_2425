import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { StudyService } from './study.service'; // Import StudyServic
import { SettingsService } from '../settings/settings.service';
import { ParticipantIdService } from '../button/participant-id.service';

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
  display ?: string = '00:25:00';
  interval$ !: Subscription;
  behaviorInterval$ ?: Subscription; // Property to store the behavior timer subscription
  isLoading: boolean = false;
  isRunning: boolean = false;
  completed_session: boolean = false;
  participantId: string = ''; // Store the participant ID

  constructor(private studyService: StudyService, private settingsService: SettingsService, private participantIdService: ParticipantIdService) 
  {
    this.settingsService.showSettings$.subscribe(show => this.showSettings=show);
  } 

  ngOnInit(): void {
    this.participantIdService.participantId$.subscribe(id => {
      this.participantId = id; // Store the participant ID when it's updated
      console.log('Participant ID:', this.participantId);  // Log it for debugging
    });
  }

//startTimer() 
startTimer() {
  if (!this.isRunning && !this.isLoading) {
    this.isLoading = true;

    //add something to pop up a message for startup each time

    // Record start button press
    this.studyService.pressStudyButton('start').subscribe(() => {

      this.isLoading = false; //within subscription, turn off loading
      this.isRunning = true;  //keep the running on

      // Start timer countdown
      this.interval$ = interval(1000).subscribe(() => {
        if (this.timeRemain > 0) {
          this.timeRemain--;
          this.updateDisplay();
          if (this.timeRemain < 10){
              this.behaviorInterval$?.unsubscribe();
              this.completed_session = true;
          }
        } else {
          this.endTimer();
        }
      });

      // Fetch behaviorFrequency and set up idle behavior
      this.participantIdService.participantId$.subscribe(userId => {
        if (userId) {
          this.settingsService.getBehaviorFrequency(Number(userId)).subscribe({
            next: (freq: number) => {
              console.log('Using frequency:', freq);
              this.behaviorInterval$ = interval(freq * 1000).subscribe(() => {
                if (this.isRunning) {
                  this.studyService.pressStudyButton('idle_behavior').subscribe({
                    error: (error: any) => console.error('Error triggering idle behavior:', error),
                  });
                }
              });
            },
            error: (error: any) => {
              console.error('Error fetching behavior frequency:', error);
              // Use a default frequency value or display a message to the user
              this.behaviorInterval$ = interval(100 * 1000).subscribe(() => {
                if (this.isRunning) {
                  this.studyService.pressStudyButton('idle_behavior').subscribe({
                    error: (error: any) => console.error('Error triggering idle behavior:', error),
                  });
                }
              });
            },
          });
        } else {
          console.error('Participant ID is not available');
        }
      });
    });
  }
}

  pauseTimer() 
  {
    if (this.isRunning) {
      this.interval$.unsubscribe();
      this.behaviorInterval$?.unsubscribe();  // Add this line
      this.isRunning = false;

      this.studyService.pressStudyButton('pause').subscribe();
    }
  }

  //endTimer() hopefully fixed for ending
  endTimer() {
    //clear all intervals FIRST
    this.interval$?.unsubscribe();
    this.behaviorInterval$?.unsubscribe();
    this.isRunning = false;  // Important to set this before other operations
  
    this.timeRemain = this.INITIAL_TIME;
    this.updateDisplay();
  
    if (this.completed_session) {
      // Use the 'end' button type instead of 'session_complete'
      this.studyService.pressStudyButton('end').subscribe(
        response => {
          console.log('Session complete button pressed:', response);
          this.completed_session = false;  // Reset completed flag after handling
        },
        error => {
          console.error('Error pressing Session Complete button:', error);
        }
      );
    } else {
      this.studyService.pressStudyButton('end').subscribe(
        response => {
          console.log('End button pressed:', response);
        },
        error => {
          console.error('Error pressing End button:', error);
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

  ngOnDestroy() 
  {
    if (this.interval$) 
      {
      this.interval$.unsubscribe();
    }

    if (this.behaviorInterval$) 
      {
      this.behaviorInterval$.unsubscribe();
    }
  }
}
