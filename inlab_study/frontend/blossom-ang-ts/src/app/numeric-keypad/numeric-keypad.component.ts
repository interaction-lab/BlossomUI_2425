// numeric-keypad.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-numeric-keypad',
  templateUrl: './numeric-keypad.component.html',
  styleUrls: ['./numeric-keypad.component.css']
})
export class NumericKeypadComponent {
  @Input() keypadVisible: boolean = false;
  @Output() keyPress = new EventEmitter<string>();
  @Output() submit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  firstRow: string[] = ['1', '2', '3'];
  secondRow: string[] = ['4', '5', '6'];
  thirdRow: string[] = ['7', '8', '9'];
  fourthRow: string[] = ['0'];

  // Emit the key press event when a number is clicked
  onKeyPress(key: string) {
    this.keyPress.emit(key);
  }

  // Handle the Delete button click
  onDelete() {
    this.delete.emit();
  }

  // Handle the Submit button click
  onSubmit() {
    this.submit.emit();
  }
}
