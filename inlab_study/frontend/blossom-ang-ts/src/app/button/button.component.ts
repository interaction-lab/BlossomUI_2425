// button.component.ts
import { Component } from '@angular/core';
import { ButtonService } from './button.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  constructor(private buttonService: ButtonService) {}

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
