import time
import board
import neopixel

# Number of LEDs in the strip
num_pixels = 38

# Number of pixels in the rainbow ribbon
rainbow_length = 20

# GPIO pin connected to the DIN of the LED strip
pixel_pin = board.D21

# Set up the LED strip
pixels = neopixel.NeoPixel(pixel_pin, num_pixels, brightness=0.5, auto_write=False)

# Function to generate rainbow colors (wheel function)
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

# Function to display the moving rainbow
def move_rainbow():
    while True:
        for step in range(num_pixels + rainbow_length):  # Total number of steps, including wraparound
            # Clear the strip
            pixels.fill((0, 0, 0))

            # Set the rainbow effect for the 20 pixels (within bounds of the strip)
            for i in range(rainbow_length):
                # Calculate which pixel in the strip will get this color
                pixel_pos = step + i - rainbow_length + 1

                # Only color pixels within the bounds of the strip (0 to 37)
                if 0 <= pixel_pos < num_pixels:
                    color = wheel(int(i * 255 / rainbow_length))  # Generate color from rainbow
                    pixels[pixel_pos] = color

            # Update the strip to show the colors
            pixels.show()

            # Wait before moving to the next step (speed of the rainbow movement)
            time.sleep(0.1)

# Start the rainbow movement
move_rainbow()
