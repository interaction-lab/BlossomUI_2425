import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrightnessService } from './brightness.service';
import { VolumeService } from './volume.service';

interface AudioPreferences
{
  animalSounds: boolean;
  digitalSounds: boolean;
  hybridSounds: boolean;
  vocalizations: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  brightnessValue: number = 100;
  volumeValue: number = 100;

<<<<<<< Updated upstream
  constructor(
    private brightnessService: BrightnessService, 
    private volumeService: VolumeService,
    private http: HttpClient
  ) { }
=======
  audioPreferences: AudioPreferences = {
    animalSounds: true,
    digitalSounds: true,
    hybridSounds: true, 
    vocalizations: true
  }

  constructor(private brightnessService: BrightnessService, private volumeService: VolumeService) { }
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  onSaveChanges(): void {
    const userId = 'user123'; // Replace with dynamic user ID when implemented
    const settings = {
      userId: userId,
      brightness: this.brightnessValue,
      volume: this.volumeValue
    };
  
    this.http.post('http://localhost:3000/save-settings', settings).subscribe({
      next: () => {
        console.log('Settings saved successfully!');
      },
      error: (error: any) => {
        console.error('Error saving settings:', error);
      }
    });
=======
  updateAudioPreference(type: keyof AudioPreferences)
  {
    this.audioPreferences[type] = !this.audioPreferences[type];

    this.volumeService.setAudioPreferences(this.audioPreferences).subscribe(
      response => {
        console.log('Audio preferences updated successfully!');
      }, 

      error => {
        console.error('Error updating audio preferences with error:', error);
      }
    );
>>>>>>> Stashed changes
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

    this.volumeService.getAudioPreferences().subscribe(
      audioPreferences => {
        this.audioPreferences = audioPreferences;
      },
      error => {
        console.error('Error getting audio preferences:', error);
      }
    )
  }

}