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

def perform_trick_1():
    print("Performing Trick 1")
    perform_next_action_random()
    return "Trick 1 performed!"

def perform_trick_2():
    print("Performing Trick 2")
    perform_next_action_random()
    return "Trick 2 performed!"

def perform_trick_3():
    print("Performing Trick 3")
    perform_next_action_random()
    return "Trick 3 performed!"

def perform_trick_4():
    print("Performing Trick 4")
    perform_next_action_random()
    return "Trick 4 performed!"

def perform_trick_5():
    print("Performing Trick 5")
    perform_next_action_random()
    return "Trick 5 performed!"

def perform_trick_6():
    print("Performing Trick 6")
    perform_next_action_random()
    return "Trick 6 performed!"

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
