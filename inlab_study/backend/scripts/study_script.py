import sys
import board
import busio
import adafruit_mpr121
import time
import random
import pygame

sys.path.insert(1, '/home/blossom/blossom-public')
from blossom_multi_model_signals import perform_next_action_random
# from LED.rpi_led_sequence import pulse_effect, row_traverse, twinkle_effect, color_chase, fade_in_out, all_on_off, rainbow_wave, strobe_effect
# from LED.motor_movements import BlossomController

# bc = BlossomController()

# # Define some colors
# color_list = [(255, 0, 0),(0, 255, 0),(0, 0, 255),(255, 255, 0),(0, 255, 255),(128, 0, 128)]
# light_seq_list = [row_traverse, twinkle_effect, color_chase, fade_in_out, fill]

# # Create I2C bus object
# i2c = busio.I2C(board.SCL, board.SDA)

# print("Touch/Behavior Test")
# pygame.init()
# pygame.mixer.init()
# pygame.mixer.music.load('/home/blossom/Downloads/S72_PURR_1.wav')

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
    # num = random.randint(0, len(light_seq_list)-1)
    # colorNum = random.randint(0, len(color_list)-1)
    # pygame.init()
    # pygame.mixer.init()
    # pygame.mixer.music.load('/home/blossom/Downloads/S72_PURR_1.wav')
    # pygame.mixer.music.play()
    # time.sleep(3)
    # light_seq_list[num](color_list[colorNum])
    # bc.sigh()
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
