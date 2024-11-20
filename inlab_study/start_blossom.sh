#!/bin/bash
# save as start_blossom.sh

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Blossom UI...${NC}"

# Navigate to project directory
cd /path/to/your/project  # Replace with your actual path

# Function to check if a process is running on a port
check_port() {
    local port=$1
    netstat -tuln | grep ":$port " >/dev/null 2>&1
}

# Start Flask backend
echo -e "${GREEN}Starting Flask backend...${NC}"
cd backend
source venv/bin/activate  # Activate virtual environment
python3 app.py &  # Run in background

# Wait for Flask to start
sleep 3

# Start Angular frontend
echo -e "${GREEN}Starting Angular frontend...${NC}"
cd ../frontend
export NODE_OPTIONS=--openssl-legacy-provider  # If needed for your Node version
ng serve --host 0.0.0.0 &  # Run in background, accessible from network

echo -e "${GREEN}Blossom UI is starting up!${NC}"
echo "Frontend will be available at: http://$(hostname -I | cut -d' ' -f1):4200"
echo "Backend will be available at: http://$(hostname -I | cut -d' ' -f1):5000"

# Keep script running
wait