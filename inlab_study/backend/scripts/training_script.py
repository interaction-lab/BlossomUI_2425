# backend/python/button_handlers.py
def yes_handler():
    print("Yes button pressed!")
    return "Yes button pressed!"

def no_handler():
    print("No button pressed!")
    return "No button pressed!"

def maybe_handler():
    print("Maybe button pressed!")
    return "Maybe button pressed!"

def sometimes_handler():
    print("Sometimes button pressed!")
    return "Sometimes button pressed!"

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        button_type = sys.argv[1].lower()
        if button_type == "yes":
            yes_handler()
        elif button_type == "no":
            no_handler()
        elif button_type == "maybe":
            maybe_handler()
        elif button_type == "sometimes":
            sometimes_handler()