import sys
#import time
#import random
import sqlite3

#import blossom_multi_model_signals as blossom

def get_settings(user_id):
    # Connect to the database
    conn = sqlite3.connect('settings.db')

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
    #blossom.perform_random_action_constrained(settings)
    return "Performing idle behavior"

def session_complete_handler():
    print("Performing end of session celebration")
    blossom.end_of_session()
    return "Performing end of session celebration"

def perform_trick_1():
    print("Performing Trick 1")
    blossom.end_of_session()
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
    


    
