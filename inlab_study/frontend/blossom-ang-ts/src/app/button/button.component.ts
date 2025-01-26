// button.component.ts
import { Component } from '@angular/core';
import { ButtonService } from './button.service';
import { ParticipantIdService } from './participant-id.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  participantId: string = '';   // The input participant ID
  submitted: boolean = false;   // Flag to determine if submission is complete
  keypadVisible: boolean = false;  // Flag to control keypad visibility

  constructor(
    private buttonService: ButtonService,
    private participantIdService: ParticipantIdService
  ) {}


  // This function handles the 'submit' button click
  submit() {
    if (this.participantId.trim()) {
      this.participantIdService.setParticipantId(this.participantId);
      
      // If the participant ID is not empty, mark it as submitted
      this.submitted = true;
      this.keypadVisible = false;  // Hide the keypad after submit
    } else {
      console.error('Participant ID cannot be empty');
    }
  }

  showKeypad() {
    this.keypadVisible = true;
  }

  onKeyPress(key: string) {
    if (key === 'Delete') {
      this.onDelete(); 
    } else {
      this.participantId += key; 
    }
  }

  onDelete() {
    this.participantId = this.participantId.slice(0, -1);  // Remove the last character
  }

  // Function to handle button clicks (Yes, No, Maybe, Sometimes)
  onButtonClick(buttonType: 'yes' | 'no' | 'maybe' | 'sometimes') {
    this.buttonService.pressButton(buttonType).subscribe(
      response => {
        console.log(`${buttonType} button pressed:`, response);
      },
      error => {
        console.error(`Error with ${buttonType} button:`, error);
      }
    );
  }
}
