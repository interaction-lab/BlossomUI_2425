# Function to show the rainbow wave effect
def rainbow_wave():
    start_time = time.time()
    
    while time.time() - start_time < 5:  # Duration of 5 seconds
        # Move the rainbow effect down the strip, wiping onto and off the strip
        for i in range(num_pixels):
            # Shift the rainbow down the strip
            for j in range(num_pixels):
                color = wheel((j + i) % 255)
                pixels[j] = color

            pixels.show()
            time.sleep(0.05)  # Adjust the speed of the wave

        # Create the effect of the rainbow "wiping off"
        for i in range(num_pixels):
            # Shift the rainbow off the strip
            for j in range(num_pixels):
                color = wheel((j + i + num_pixels // 2) % 255)
                pixels[j] = color

            pixels.show()
            time.sleep(0.05)  # Adjust the speed of the wave

    # Turn off the strip after the effect ends
    pixels.fill((0, 0, 0))
    pixels.show()