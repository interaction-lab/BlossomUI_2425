#!/bin/bash

#clone and navigate to project [before frontend and startup]
git clone https://github.com/interaction-lab/BlossomUI_2425.git
cd ./BlossomUI_2425/inlab_study

#middleware
cd middleware
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

#setup frontend
cd ../frontend/blossom-ang-ts
npm install
chmod +x start_blossom.sh
./start_blossom.sh