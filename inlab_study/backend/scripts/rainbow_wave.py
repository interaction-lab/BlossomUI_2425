import time
import board
import neopixel

# Number of LEDs in the strip
num_pixels = 38

# GPIO pin connected to the DIN of the LED strip
pixel_pin = board.D21

# Set up the LED strip
pixels = neopixel.NeoPixel(pixel_pin, num_pixels, brightness=0.5, auto_write=False)

# Function to generate rainbow colors
def wheel(pos):
    """Generate a color from the rainbow wheel."""
    if pos < 85:
        return (pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return (255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return (0, pos * 3, 255 - pos * 3)

# Function to display a rainbow in the middle 20 pixels
def show_rainbow_middle():
    # Set all pixels to off first
    pixels.fill((0, 0, 0))
    
    # Determine the start and end positions of the middle 20 pixels
    start_pixel = (num_pixels - 20) // 2
    end_pixel = start_pixel + 20
    
    # Apply rainbow effect to the middle 20 pixels
    for i in range(start_pixel, end_pixel):
        color = wheel(int((i - start_pixel) * 255 / 19))  # Map index to color
        pixels[i] = color
    
    # Update the strip to show the colors
    pixels.show()

# Example usage
while True:
    show_rainbow_middle()
    time.sleep(0.1)
