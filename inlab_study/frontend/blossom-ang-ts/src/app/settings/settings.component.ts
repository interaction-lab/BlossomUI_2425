import { Component, OnInit } from '@angular/core';
import { BrightnessService } from './brightness.service';
import { VolumeService } from './volume.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  brightnessValue: number = 100;
  volumeValue: number = 100;

  constructor(private brightnessService: BrightnessService, private volumeService: VolumeService) { }

  updateBrightness(event: any)
  {
    this.brightnessValue = event.target.value; 
    //function to update the brightness value of the slider based
    //on the user's preference

    this.brightnessService.setBrightness(this.brightnessValue).subscribe(
      response => 
        {
          console.log('success');
        },

      error => 
        {
          console.error('Full error:', {
          status: error.status,
          message: error.message,
          error: error
        });
      } 
    );
  }

  updateVolume(event: any)
  {
    this.volumeValue = event.target.value; 

    this.volumeService.setVolume(this.volumeValue).subscribe(
      response =>
      {
        console.log('success');
      }, 

      error =>
      {
        console.error('Full error:', {
          status: error.status, 
          message: error.message, 
          error: error
        });
      }
    );
  }

  ngOnInit(): void {
    this.brightnessService.getBrightness().subscribe(
      brightness => {
        this.brightnessValue = brightness;
      },
      error => {
        console.error('Error getting current brightness:', error);
      }
    );
  }

}
