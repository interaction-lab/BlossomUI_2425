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
  isRunning: boolean = false;
  completed_session: boolean = false;
  participantId: string = ''; // Store the participant ID

  constructor(
    private studyService: StudyService, 
    private settingsService: SettingsService, 
    private participantIdService: ParticipantIdService
  ) 
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
  if (!this.isRunning) {
    this.isRunning = true;

    // Record start button press
    this.studyService.pressStudyButton('start').subscribe(() => {
      // Start timer countdown
      this.interval$ = interval(1000).subscribe(() => {
        if (this.timeRemain > 0) {
          this.timeRemain--;
          this.updateDisplay();
        } else {
          this.completed_session = true;
          this.endTimer();
        }
      });

      // Fetch behaviorFrequency and set up idle behavior
      const userId = 1; // Replace with the actual user ID
      this.settingsService.getBehaviorFrequency(Number(this.participantId)).subscribe({
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
        },
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

    endTimer() 
    {
      //clear all intervals FIRST
      this.interval$?.unsubscribe();
      this.behaviorInterval$?.unsubscribe();
      this.isRunning = false;  // Important to set this before other operations
      
      this.timeRemain = this.INITIAL_TIME;
      this.updateDisplay();

      if (this.completed_session) {
          // Add a small delay before session complete behavior
          setTimeout(() => {
              this.studyService.pressStudyButton('session_complete').subscribe(
                  response => {
                      console.log('Session complete button pressed:', response);
                      this.completed_session = false;  // Reset completed flag after handling
                  },
                  error => {
                      console.error('Error pressing Session Complete button:', error);
                  }
              );
          }, 1000);
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
