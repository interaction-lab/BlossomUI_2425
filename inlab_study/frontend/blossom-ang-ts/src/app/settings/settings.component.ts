import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrightnessService } from './brightness.service';
import { VolumeService } from './volume.service';
import { ParticipantIdService } from '../button/participant-id.service';

interface AudioPreferences
{
  animalSounds: boolean;
  digitalSounds: boolean;
  hybridSounds: boolean;
  vocalizations: boolean;
}

interface ColorPreferences
{
  red: boolean;
  orange: boolean;
  yellow: boolean;
  green: boolean;
  blue: boolean;
  purple: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  brightnessValue: number = 100;
  volumeValue: number = 100;

  audioPreferences: AudioPreferences = {
    animalSounds: true,
    digitalSounds: true,
    hybridSounds: true, 
    vocalizations: true
  }

  colorPreferences: ColorPreferences = {
    red: false,
    orange: false,
    yellow: false,
    green: false,
    blue: false,
    purple: false
  };

  participantId: string = ''; // Store the participant ID

  constructor(
    private brightnessService: BrightnessService, 
    private volumeService: VolumeService, 
    private http: HttpClient,
    private participantIdService: ParticipantIdService // Inject the ParticipantIdService
  ) { }

  updateColorPreference(color: keyof ColorPreferences) 
  {
    this.colorPreferences[color] = !this.colorPreferences[color];
    // You can add logic here to update the robot's LEDs
    console.log('Updated color preferences:', this.colorPreferences);
  }

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

  onSaveChanges(): void {
    if (!this.participantId) {
      console.error('Participant ID is missing.');
      return;
    }

    const settings = {
      userId: this.participantId,
      brightness: this.brightnessValue,
      volume: this.volumeValue,
      audioPreferences: this.audioPreferences,
      colorPreferences: this.colorPreferences
    };
  
    this.http.post('http://localhost:3000/save-settings', settings).subscribe({
      next: () => {
        console.log('Settings saved successfully!');
      },
      error: (error: any) => {
        console.error('Error saving settings:', error);
      }
    });
  }
    
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
  }

  ngOnInit(): void {
    this.participantIdService.participantId$.subscribe(id => {
      this.participantId = id; // Store the participant ID when it's updated
      console.log('Participant ID:', this.participantId);  // Log it for debugging
    });

    if (this.participantId) {
      this.http.get<any>(`http://localhost:3000/get-settings/${this.participantId}`).subscribe(
        (settings) => {
          // Map the response to component properties
          this.brightnessValue = settings.brightness || 100;
          this.volumeValue = settings.volume || 100;
    
          // Map audio preferences
          this.audioPreferences = {
            animalSounds: settings.audioPreferences?.animalSounds ?? true,
            digitalSounds: settings.audioPreferences?.digitalSounds ?? true,
            hybridSounds: settings.audioPreferences?.hybridSounds ?? true,
            vocalizations: settings.audioPreferences?.vocalizations ?? true
          };
    
          // Map color preferences
          this.colorPreferences = {
            red: settings.colorPreferences?.red ?? false,
            orange: settings.colorPreferences?.orange ?? false,
            yellow: settings.colorPreferences?.yellow ?? false,
            green: settings.colorPreferences?.green ?? false,
            blue: settings.colorPreferences?.blue ?? false,
            purple: settings.colorPreferences?.purple ?? false
          };
    
          console.log('Loaded settings:', settings);
        },
        (error) => {
          console.error('Error loading settings:', error);
        }
      );
    }
  }
  
}