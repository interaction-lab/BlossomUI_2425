#!/bin/bash

# Make script executable
chmod +x "$(readlink -f "$0")"

# Setup backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py &

# Wait for backend to start
sleep 3

# Setup and start frontend
cd ../frontend/blossom-ang-ts
npm install
export NODE_OPTIONS=--openssl-legacy-provider
ng serve --host 0.0.0.0 &

echo "Blossom UI is starting up!"
echo "Frontend: http://$(hostname -I | cut -d' ' -f1):4200"
echo "Backend: http://$(hostname -I | cut -d' ' -f1):5000"

wait