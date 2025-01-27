import sqlite3
import os

# Check if the database already exists
db_filename = 'settings.db'
if os.path.exists(db_filename):
    raise FileExistsError(f"The database file '{db_filename}' already exists. Please remove it before proceeding.")

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect(db_filename)
cursor = conn.cursor()

# Create settings table with user_id and various settings values
cursor.execute('''
CREATE TABLE IF NOT EXISTS settings (
    user_id INTEGER PRIMARY KEY,
    brightness INTEGER DEFAULT 100,
    behaviorFrequency INTEGER DEFAULT 30,
    animal_sounds BOOLEAN DEFAULT 1,
    digital_sounds BOOLEAN DEFAULT 1,
    hybrid_sounds BOOLEAN DEFAULT 1,
    vocalizations BOOLEAN DEFAULT 1,
    red BOOLEAN DEFAULT 1,
    rose BOOLEAN DEFAULT 1,
    magenta BOOLEAN DEFAULT 1,
    purple BOOLEAN DEFAULT 1,
    blue BOOLEAN DEFAULT 1,
    cyan BOOLEAN DEFAULT 1,
    green BOOLEAN DEFAULT 1,
    lime BOOLEAN DEFAULT 1,
    yellow BOOLEAN DEFAULT 1,
    orange BOOLEAN DEFAULT 1
);
''')

# Create settings_audit table to log changes made to the settings table
cursor.execute('''
CREATE TABLE IF NOT EXISTS settings_audit (
    audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    column_name TEXT,
    old_value TEXT,
    new_value TEXT,
    change_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES settings (user_id)
);
''')

# Create sessions_completed table to store session counts for each user
cursor.execute('''
CREATE TABLE IF NOT EXISTS sessions_completed (
    user_id INTEGER PRIMARY KEY,
    sessions_completed INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES settings (user_id)
);
''')

# Create a trigger to automatically log changes to the settings table in the settings_audit table
cursor.execute('''
CREATE TRIGGER IF NOT EXISTS settings_update_audit
AFTER UPDATE ON settings
FOR EACH ROW
BEGIN
    -- Log changes for each column in settings table (assuming column is being updated)
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'brightness', OLD.brightness, NEW.brightness
    WHERE OLD.brightness != NEW.brightness;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'behaviorFrequency', OLD.behaviorFrequency, NEW.behaviorFrequency
    WHERE OLD.behaviorFrequency != NEW.behaviorFrequency;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'animal_sounds', OLD.animal_sounds, NEW.animal_sounds
    WHERE OLD.animal_sounds != NEW.animal_sounds;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'digital_sounds', OLD.digital_sounds, NEW.digital_sounds
    WHERE OLD.digital_sounds != NEW.digital_sounds;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'hybrid_sounds', OLD.hybrid_sounds, NEW.hybrid_sounds
    WHERE OLD.hybrid_sounds != NEW.hybrid_sounds;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'vocalizations', OLD.vocalizations, NEW.vocalizations
    WHERE OLD.vocalizations != NEW.vocalizations;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'red', OLD.red, NEW.red
    WHERE OLD.red != NEW.red;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'rose', OLD.rose, NEW.rose
    WHERE OLD.rose != NEW.rose;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'magenta', OLD.magenta, NEW.magenta
    WHERE OLD.magenta != NEW.magenta;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'purple', OLD.purple, NEW.purple
    WHERE OLD.purple != NEW.purple;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'blue', OLD.blue, NEW.blue
    WHERE OLD.blue != NEW.blue;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'cyan', OLD.cyan, NEW.cyan
    WHERE OLD.cyan != NEW.cyan;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'green', OLD.green, NEW.green
    WHERE OLD.green != NEW.green;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'lime', OLD.lime, NEW.lime
    WHERE OLD.lime != NEW.lime;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'yellow', OLD.yellow, NEW.yellow
    WHERE OLD.yellow != NEW.yellow;
    INSERT INTO settings_audit (user_id, column_name, old_value, new_value)
    SELECT NEW.user_id, 'orange', OLD.orange, NEW.orange
    WHERE OLD.orange != NEW.orange;
END;
''')

# Commit the changes and close the connection
conn.commit()

print("Database and tables created successfully.")

# Close the database connection
conn.close()
