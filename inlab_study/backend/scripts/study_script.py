import sys
import board
import busio
import adafruit_mpr121
import time
import random
import pygame

sys.path.insert(1, '/home/blossom/blossom-public')
from blossom_multi_model_signals import perform_next_action_random

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

def ib_handler():
    print("Performing idle behavior")
    perform_next_action_random()
    return "Performing idle behavior"

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        button_type = sys.argv[1].lower()
        if button_type == "start":
            start_handler()
        elif button_type == "pause":
            pause_handler()
        elif button_type == "end":
            end_handler()
        elif button_type == "idle_behavior":
            ib_handler()
