# Function to show the rainbow wave effect
def rainbow_wave():
    # Length of the rainbow segment
    rainbow_length = 15
    
    # We will loop for a duration of 5 seconds
    start_time = time.time()
    
    while time.time() - start_time < 5:
        # Move the rainbow down the strip
        for i in range(num_pixels - rainbow_length):  # Ensure the rainbow fits within the strip
            # Create the rainbow effect across 15 pixels
            for j in range(rainbow_length):
                color = wheel((j + i) % 255)  # Offset the color for each pixel
                pixels[i + j] = color  # Set each pixel in the range

            # Fill the rest of the strip with black (to clear past pixels)
            for k in range(i + rainbow_length, num_pixels):
                pixels[k] = (0, 0, 0)

            # Show the updated strip
            pixels.show()
            
            # Control the speed of the movement
            time.sleep(0.05)

    # Turn off the strip after the effect ends
    pixels.fill((0, 0, 0))
    pixels.show()