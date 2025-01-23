// button.component.ts
import { Component } from '@angular/core';
import { ButtonService } from './button.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  participantId: string = '';   // The input participant ID
  submitted: boolean = false;   // Flag to determine if submission is complete
  keypadVisible: boolean = false;  // Flag to control keypad visibility

  constructor(private buttonService: ButtonService) {}

  // This function handles the 'submit' button click
  submit() {
    if (this.participantId.trim()) {
      // If the participant ID is not empty, mark it as submitted
      this.submitted = true;
      this.keypadVisible = false;  // Hide the keypad after submit
    } else {
      console.error('Participant ID cannot be empty');
    }
  }

  // This function triggers when the input box is focused to show the keypad
  showKeypad() {
    this.keypadVisible = true;  // Show the keypad when input box is focused
  }

  // Handle key presses from the numeric keypad
  onKeyPress(key: string) {
    if (key === 'Delete') {
      this.onDelete();  // Trigger the delete functionality if the key is 'Delete'
    } else {
      this.participantId += key;  // Append the key to the participant ID
    }
  }

  // Handle delete action from the numeric keypad
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
