import sqlite3

# Connect to the database (or create it if it doesn't exist)
conn = sqlite3.connect('../settings.db')

# Create a cursor object to interact with the database
cursor = conn.cursor()

# Define the user_id you're looking for
user_id = 'user123'  

# Execute the query to find settings for the specified user_id
cursor.execute("SELECT * FROM settings WHERE user_id = ?", (user_id,))

# Fetch the result
settings = cursor.fetchone()  # This will return the first match, or None if no match is found

if settings:
    print(f"Raw settings tuple: {settings}")  # Print out the raw result

    # Unpack the tuple into individual variables
    user_id, brightness, volume, animal_sounds, digital_sounds, hybrid_sounds, vocalizations, \
    red, orange, yellow, green, blue, purple = settings

    print(f"Settings for user {user_id}:")
    print(f"Brightness: {brightness}")
    print(f"Volume: {volume}")
    print(f"Animal Sounds: {animal_sounds}")
    print(f"Digital Sounds: {digital_sounds}")
    print(f"Hybrid Sounds: {hybrid_sounds}")
    print(f"Vocalizations: {vocalizations}")
    print(f"Red: {red}")
    print(f"Orange: {orange}")
    print(f"Yellow: {yellow}")
    print(f"Green: {green}")
    print(f"Blue: {blue}")
    print(f"Purple: {purple}")
else:
    print(f"No settings found for user {user_id}")

# Close the connection
conn.close()
