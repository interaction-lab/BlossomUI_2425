import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrightnessService } from './brightness.service';
import { VolumeService } from './volume.service';
import { ParticipantIdService } from '../button/participant-id.service';
import { SettingsService } from '../settings/settings.service';

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
  rose: boolean;
  magenta: boolean;
  purple: boolean;
  orange: boolean;
  yellow: boolean;
  green: boolean;
  lime: boolean;
  blue: boolean;
  cyan: boolean;
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
    red: true,
    rose: true,
    magenta: true,
    purple: true,
    blue: true,
    cyan: true,
    green: true,
    lime: true,
    yellow: true,
    orange: true
  };

  participantId: string = ''; // Store the participant ID

  constructor(
    private brightnessService: BrightnessService, 
    private volumeService: VolumeService, 
    private http: HttpClient,
    private participantIdService: ParticipantIdService,
    private settingsService: SettingsService
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
        this.settingsService.toggleSettings();
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
          this.volumeValue = settings.volume || 15;
    
          // Map audio preferences
          this.audioPreferences = {
            animalSounds: settings.audioPreferences?.animalSounds ?? true,
            digitalSounds: settings.audioPreferences?.digitalSounds ?? true,
            hybridSounds: settings.audioPreferences?.hybridSounds ?? true,
            vocalizations: settings.audioPreferences?.vocalizations ?? true
          };
    
          // Map color preferences
          this.colorPreferences = {
            red: settings.colorPreferences?.red ?? true,
            rose: settings.colorPreferencse?.rose ?? true,
            magenta: settings.colorPreferences?.magenta ?? true,
            lime: settings.colorPreferences?.lime ?? true,
            cyan: settings.colorPreferences?.cyan ?? true,
            orange: settings.colorPreferences?.orange ?? true,
            yellow: settings.colorPreferences?.yellow ?? true,
            green: settings.colorPreferences?.green ?? true,
            blue: settings.colorPreferences?.blue ?? true,
            purple: settings.colorPreferences?.purple ?? true
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