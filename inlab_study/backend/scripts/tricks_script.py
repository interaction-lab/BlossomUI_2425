import sys
# TODO: update this to pull from a new script 
# add tricks to BlossomController in motor_movements.py
# then define functions in blossom_multi_model_signals.py
from blossom_multi_model_signals import perform_trick_1, perform_trick_2, perform_trick_3, perform_trick_4, perform_trick_5, perform_trick_6

def trick_handler(trick_type):
    if trick_type == "trick_1":
        perform_trick_1()
    elif trick_type == "trick_2":
        perform_trick_2()
    elif trick_type == "trick_3":
        perform_trick_3()
    elif trick_type == "trick_4":
        perform_trick_4()
    elif trick_type == "trick_5":
        perform_trick_5()
    elif trick_type == "trick_6":
        perform_trick_6()
    else:
        print(f"Unknown trick: {trick_type}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        trick_type = sys.argv[1].lower()
        trick_handler(trick_type)
