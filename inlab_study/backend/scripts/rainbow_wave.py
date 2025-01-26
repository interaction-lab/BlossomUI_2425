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

# Function to show the rainbow moving across the strip
def move_rainbow():
    # Total number of steps for the rainbow to move across (from start to end)
    num_steps = num_pixels - 20
    delay_per_step = 2.0 / num_steps  # Total time to move divided by number of steps
    
    for _ in range(5):  # Repeat the animation 5 times
        # Move the rainbow across the strip
        for step in range(num_steps):
            # Clear the strip
            pixels.fill((0, 0, 0))
            
            # Determine the start and end position for the current rainbow segment
            start_pixel = step
            end_pixel = start_pixel + 20
            
            # Apply rainbow effect to the current 20 pixels
            for i in range(start_pixel, end_pixel):
                color = wheel(int((i - start_pixel) * 255 / 19))  # Map index to color
                pixels[i] = color
            
            # Update the strip to show the colors
            pixels.show()
            
            # Wait before moving to the next step
            time.sleep(delay_per_step)
        
        # After one full pass, clear the strip before starting again
        pixels.fill((0, 0, 0))
        pixels.show()
        time.sleep(0.5)  # Pause for a short time before restarting the animation

# Example usage
move_rainbow()
