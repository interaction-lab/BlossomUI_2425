import { Component, OnInit } from '@angular/core';
import { TricksService } from './tricks.service'; // Import TricksService

@Component({
  selector: 'app-tricks',
  templateUrl: './tricks.component.html',
  styleUrls: ['./tricks.component.css']
})
export class TricksComponent implements OnInit {

  constructor(private tricksService: TricksService) {} // Inject TricksService

  ngOnInit(): void {}

  // Function to handle button clicks and send the request
  performTrick(trick: string) {
    this.tricksService.performTrick(trick).subscribe(
      (response: any) => {
        console.log(`${trick} triggered:`, response); // Log success
      },
      (error: any) => {
        console.error(`Error triggering ${trick}:`, error); // Log error
      }
    );
  }
}
