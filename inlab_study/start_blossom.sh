#!/usr/bin/env bash

# Store the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd "$SCRIPT_DIR" #move to that directory

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required commands
if ! command_exists python3; then
    echo "Python3 is required but not installed. Installing..."
    sudo apt-get update && sudo apt-get install -y python3
fi

if ! command_exists pip3; then
    echo "Pip3 is required but not installed. Installing..."
    sudo apt-get install -y python3-pip
fi

# Create and activate virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate

# Install requirements if needed
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
fi

# Start the Blossom UI setup
echo "Starting Angular frontend (UI)..."
cd frontend/blossom-ang-ts #navigate to Angular project directory
#npm install
echo "y" | ng serve &

# Wait for Angular to start
sleep 5

#launching chromium in fullscreen on raspberry pi!
DISPLAY=:0 chromium-browser --kiosk --start-fullscreen --noerrdialogs --disable-infobars --no-first-run "http://localhost:4200" &
#opens in full-screen now, just saying localhost refused to connect... look at connectivity
cd "$SCRIPT_DIR" #cd after fullscreen functionality achieved

# Start the robot
echo "Starting Blossom robot..."
#start_robot.py is in the same directory as start_blossom.sh
if [ -f "start_robot.py" ]; then
    python3 start_robot.py
else 
    echo "Error: start_robot.py not found in $SCRIPT_DIR"
    exit 1
fi

# Trap SIGINT to handle Ctrl+C
trap 'trap - SIGINT && kill -- -$$' SIGINT

# Keep script running
wait