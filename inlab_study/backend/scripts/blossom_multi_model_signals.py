import sys
import random
import pygame
sys.path.insert(1, '/home/blossom/blossom-public')


# Import light sequences
from LED.rpi_led_sequence import row_traverse, twinkle_effect, color_chase, fade_in_out, fill
from LED.motor_movements import BlossomController

bc = BlossomController()
pygame.init()
pygame.mixer.init()

# Light definitions
R = (255, 0, 0)
G = (0, 255, 0)
B = (0, 0, 255)
C = (0, 255, 255)
M = (255, 0, 255)
Y = (255, 255, 0)
O = (255, 165, 0)
P = (128, 0, 128)

color_list = [R, G, B, C, M, Y]

color_map = {
    0: 'red',
    1: 'green',
    2: 'blue',
    3: 'cyan',
    4: 'magenta',
    5: 'yellow',
}

light_seq_list = [row_traverse, twinkle_effect, color_chase, fade_in_out, fill]
sequence_dict = {
	row_traverse: 0,
	twinkle_effect: 1,
	color_chase: 2,
	fade_in_out: 3,
	fill: 4
}

animal_sound_list = [
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/animal_recordings/cat_meow_16.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/animal_recordings/cat_purr_16.wav",
"/home/blossom/blossom-public/personalization/final_sounds_new_categories/animal_recordings/dog_whimper.wav",
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

motor_map = {
	0: "sigh",
	1: "idle gaze",
	2: "posture sway"
}

motor_movements_list = [bc.sigh, bc.idle_gaze, bc.posture_sway]

# def perform_action(action):
#     light_index, color, sound_index, sound_category, movement = action
    
#     if sound_index != -1:
#         print(f"Now playing sound {sound_index + 1} in category {sound_category + 1}")
#         pygame.mixer.music.load(sound_list[sound_index])  # Play the sound
#         pygame.mixer.music.play()
        
#     if movement != -1:
#         print(f"Now performing motor movement {movement + 1}")
#         motor_movements_list[movement]()  # Perform the motor movement
        
#     if light_index != -1:
#         #color_name = color_map[color]
#         print(f"Now playing light sequence {light_index + 1} with color {color}")
#         light_seq_list[light_index](color_list[color])  # Play the light sequence


# def perform_next_action_random():
    
#     # Pick the most uncertain behavior
#     action = random.choice(multi_feature_action_space)
#     print(f"Performing behavior: {action}")

#     # Perform the action
#     perform_action(action)  # Ensure this function triggers the robot action

def perform_random_action_constrained(settings):
    user_id, brightness, volume, animal_sounds, digital_sounds, hybrid_sounds, \
    vocalizations, red, orange, yellow, green, blue, purple = settings

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
    if orange:
        valid_colors.append(O)
    if yellow:
        valid_colors.append(Y)
    if green:
        valid_colors.append(G)
    if blue:
        valid_colors.append(B)
    if purple:
        valid_colors.append(P)

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
 

# Step 1: Perform all single-feature actions
# Define the single-feature action space
single_feature_action_space = []

# Add lights (unimodal)
# for sequence in light_seq_list:
    # for i in range(3):  # 3 colors (R, G, B)
        # single_feature_action_space.append((sequence_dict[sequence], i, -1, -1, -1))
        
# Add lights - need to fix this
# start_index = 0
# color_index = 0
# for sequence in light_seq_list:
# 	for i in range(3):
# 		color_index = start_index + i
# 		if color_index >= len(color_list):
# 			color_index -= len(color_list) 
# 		single_feature_action_space.append((sequence_dict[sequence], color_index, -1, -1, -1))
# 		#action_space.append(("light", index, sequence_dict[sequence]))
# 	start_index += 1

# # Add sounds (unimodal)
# for sound_index in range(len(sound_list)):
#     single_feature_action_space.append((-1, -1, sound_index, sound_index // 4, -1))  # sound index // 4 represents sound category

# # Add motor movements (unimodal)
# for motor_index in range(len(motor_map)):
#     single_feature_action_space.append((-1, -1, -1, -1, motor_index))

# # Randomize order
# random.shuffle(single_feature_action_space)

# # Create the second action space (all combinations)
multi_feature_action_space = []
# for sequence in light_seq_list:
#     for color in range(len(color_list)):
#         for sound_index in range(len(sound_list)):
#             for movement in range(len(motor_map)):
#                 multi_feature_action_space.append((sequence_dict[sequence], color, sound_index, sound_index // 4, movement)) 
                
# for sound_index in range(len(sound_list)):
#     for movement in range(len(motor_map)):
#         multi_feature_action_space.append((-1, -1, sound_index, sound_index // 4, movement)) 
        
# for sequence in light_seq_list:
#     for color in range(len(color_list)):
#         for movement in range(len(motor_map)):
#             multi_feature_action_space.append((sequence_dict[sequence], color, -1, -1, movement)) 
            
# for sequence in light_seq_list:
#     for color in range(len(color_list)):
#         for sound_index in range(len(sound_list)):
#             multi_feature_action_space.append((sequence_dict[sequence], color, sound_index, sound_index // 4, -1)) 

# # # Step 2: Random sampling for 22 rounds
# # for i in range(22):
# #     # Random
# #     perform_next_action_random(multi_feature_action_space)


