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

# Function to show the rainbow wiping across the strip
def move_rainbow():
    # Total number of steps for the rainbow to move across (from start to end)
    num_steps = num_pixels - 20
    delay_per_step = 2.0 / num_steps  # Total time to move divided by number of steps
    
    for _ in range(5):  # Repeat the animation 5 times
        # First phase: Wipe onto the strip from pixel 0
        for step in range(20):  # 20 steps to fill the 20-pixel rainbow
            # Clear the strip
            pixels.fill((0, 0, 0))
            
            # Apply rainbow effect to the current growing segment
            for i in range(step + 1):  # Gradually fill up to step+1 pixels
                color = wheel(int(i * 255 / 19))  # Map index to color
                pixels[i] = color
            
            # Update the strip to show the colors
            pixels.show()
            
            # Wait before moving to the next step
            time.sleep(0.1)
        
        # Second phase: Wipe off from the end (pixel 37) towards the start
        for step in range(num_steps):  # Move the rainbow across the strip
            # Clear the strip
            pixels.fill((0, 0, 0))
            
            # Apply rainbow effect to the current 20 pixels, moving right
            for i in range(20):
                color = wheel(int(i * 255 / 19))  # Map index to color
                if 0 <= step + i < num_pixels:  # Ensure we don't exceed the number of pixels
                    pixels[step + i] = color
            
            # Wipe off the rainbow from the right side as it moves
            for i in range(20):
                if step + i >= num_pixels:
                    pixels[num_pixels - 1 - i] = (0, 0, 0)  # Turn off the pixel

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
