import sys
import board
import busio
import adafruit_mpr121
import time
import random
import pygame
import sqlite3

# getting Blossom control code directly ////////////////////////////////////////////////
sys.path.insert(1, '/home/blossom/blossom-public')


# Import light sequences
from LED.rpi_led_sequence import row_traverse, twinkle_effect, color_chase, fade_in_out, fill, rainbow_wave
from LED.motor_movements import BlossomController

bc = BlossomController()
pygame.init()
pygame.mixer.init()

animal_sound_list = [
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/animal_recordings/cat_meow_16.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/animal_recordings/cat_purr_16.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/animal_recordings/guinea_pig.wav"
]

hybrid_sound_list = [
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/animal_vocables/S29_MEOW_1.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/animal_vocables/S44_SNEEZE_2.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/animal_vocables/S72_PURR_3.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/animal_vocables/S89_BARK_1.wav"
]

digital_sound_list = [
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/electronic_noises/Beep4.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/electronic_noises/LIKED_MOMENT_2.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/electronic_noises/S77_FUNCTIONAL_SUCCESS.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/electronic_noises/shutter_2.wav"
]

vocalizations_sound_list = [
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/human_vocables/No.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/human_vocables/S19_WHAT_THE_HECK_2.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/human_vocables/Yes.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/human_vocables/YOURE_WELCOME.wav"
]

# Light definitions
R = (255, 0, 0)
S = (255, 0, 128)
M = (255, 0, 255)
P = (128, 0, 128)
B = (0, 0, 255)
C = (0, 255, 255)
G = (0, 255, 0)
L = (128, 255, 0)
Y = (255, 255, 0)
O = (255, 165, 0)

motor_movements_list = [bc.sigh, bc.idle_gaze, bc.posture_sway]

def perform_random_action_constrained(settings):
    user_id, brightness, volume, animal_sounds, digital_sounds, hybrid_sounds, \
    vocalizations, red, rose, magenta, purple, blue, cyan, green, lime, yellow, orange = settings

    valid_sounds = []

    # Add sounds to the list based on the boolean flags
    if animal_sounds:
        valid_sounds.extend(animal_sound_list)
    if digital_sounds:
        valid_sounds.extend(digital_sound_list)
    if hybrid_sounds:
        valid_sounds.extend(hybrid_sound_list)
    if vocalizations:
        valid_sounds.extend(vocalizations_sound_list)

    # Ensure there are valid sounds to choose from
    if valid_sounds:
        # Randomly select a sound from the valid options
        random_sound = random.choice(valid_sounds)
    else:
        random_sound = None

    valid_colors = []

    if red:
        valid_colors.append(R)
    if rose:
        valid_colors.append(S)
    if magenta:
        valid_colors.append(M)
    if purple:
        valid_colors.append(P)
    if blue:
        valid_colors.append(B)
    if cyan:
        valid_colors.append(C)
    if green:
        valid_colors.append(G)
    if lime:
        valid_colors.append(L)
    if yellow:
        valid_colors.append(Y)
    if orange:
        valid_colors.append(O)

    # Ensure there are valid colors to choose from
    if valid_colors:
        # Randomly select a color from the valid options
        random_color = random.choice(valid_colors)
        random_color = tuple(int(c * brightness/100) for c in random_color)
        print(f"Randomly selected color: {random_color}")
    else:
        random_color = None   
    
    if random_sound:
        pygame.mixer.music.load(random_sound)  # Play the sound
        pygame.mixer.music.play()
        
    random.choice(motor_movements_list)()  # Perform the motor movement

    if random_color:
        random.choice(light_seq_list)(random_color)

def end_of_session():
    rainbow_wave()
    success_sound = "/home/blossom/blossom-public/personalization/final_sounds_new_categories/misc/success-fanfare-trumpets.mp3"
    pygame.mixer.music.load(success_sound) 
    pygame.mixer.music.play()

def perform_trick_1():
    rainbow_wave()
#///////////////////////////////////////////////////

# import blossom_multi_model_signals as blossom

def get_settings(user_id):
    # Connect to the database
    conn = sqlite3.connect('../settings.db')

    # Create a cursor object to interact with the database
    cursor = conn.cursor()

    # Define the user_id you're looking for
    # TODO: get the current user's username
    # user_id = 'user123'  

    # find settings for the specified user_id
    cursor.execute("SELECT * FROM settings WHERE user_id = ?", (user_id,))

    # return the first match
    settings = cursor.fetchone()

    # close the connection
    conn.close()

    return settings
    # how to unpack tuple into individual variables
    # user_id, brightness, volume, animal_sounds, digital_sounds, hybrid_sounds, vocalizations, \
    # red, orange, yellow, green, blue, purple = settings
    

# backend/python/button_handlers.py
def start_handler():
    print("Start button pressed!")
    return "Start button pressed!"

def pause_handler():
    print("Pause button pressed!")
    return "Pause button pressed!"

def end_handler():
    print("End button pressed!")
    return "End button pressed!"

def ib_handler(participant_id):
    print("Performing idle behavior")
    settings = get_settings(participant_id)
    # blossom.perform_random_action_constrained(settings)
    perform_random_action_constrained(participant_id)
    return "Performing idle behavior"

def session_complete_handler():
    print("Performing end of session celebration")
    # blossom.end_of_session()
    end_of_session()
    return "Performing end of session celebration"

def perform_trick_1():
    print("Performing Trick 1")
    # blossom.end_of_session()
    end_of_session()
    return "Trick 1 performed!"

def perform_trick_2():
    print("Performing Trick 2")
    return "Trick 2 performed!"

def perform_trick_3():
    print("Performing Trick 3")
    return "Trick 3 performed!"

def perform_trick_4():
    print("Performing Trick 4")
    return "Trick 4 performed!"

def perform_trick_5():
    print("Performing Trick 5")
    return "Trick 5 performed!"

def perform_trick_6():
    print("Performing Trick 6")
    return "Trick 6 performed!"

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 2:
        button_type = sys.argv[1].lower()
        participant_id = sys.argv[2]
        if button_type == "start":
            start_handler()
        elif button_type == "idle_behavior":
            ib_handler(participant_id)
        elif button_type == "pause":
            pause_handler()
        elif button_type == "end":
            end_handler()
        elif button_type == "session_complete":
            session_complete_handler()
    if len(sys.argv) > 1:
        button_type = sys.argv[1].lower()
        if button_type == "start":
            start_handler()
        elif button_type == "pause":
            pause_handler()
        elif button_type == "end":
            end_handler()
        elif button_type == "trick_1":
            perform_trick_1()
        elif button_type == "trick_2":
            perform_trick_2()
        elif button_type == "trick_3":
            perform_trick_3()
        elif button_type == "trick_4":
            perform_trick_4()
        elif button_type == "trick_5":
            perform_trick_5()
        elif button_type == "trick_6":
            perform_trick_6()
    


    
