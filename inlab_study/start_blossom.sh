#!/bin/bash

# Clone and navigate to project
git clone https://github.com/interaction-lab/BlossomUI_2425.git
cd BlossomUI_2425/inlab_study

# Setup backend
cd middleware
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py &

# Wait for backend to start
sleep 3

# Setup and start frontend
cd ../frontend/blossom-ang-ts
npm install
npm audit fix #fix any vulnerabilites
sudo npm install -g @angular/cli #ensure Angular CLI is installed
export NODE_OPTIONS=--openssl-legacy-provider

#install requirements.txt based on platform
if [[ $(uname) == "Darwin" ]]; then
    pip install flask flask-cors
else
    pip install -r requirements.txt
fi

python3 app.py &

#IP address safely
IP=$(ipconfig getifaddr en0 2>/dev/null || hostname -I | awk '{print $1}')

ng serve --host 0.0.0.0 &

if [[ "$OSTYPE" == "darwin"* ]]; then
    open "http://$IP:4200" &
    open "http://$IP:5000" &
else
    xdg-open "http://$IP:4200" &
    xdg-open "http://$IP:5000" &
fi

echo "Blossom UI has started up!"
echo "Frontend: http://$IP:4200"
echo "Backend: http://$IP:5000"