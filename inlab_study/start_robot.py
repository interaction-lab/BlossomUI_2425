# start_robot.py
from robot_control import RobotController  # Your robot control class
import subprocess
import os

def main():
    # Initialize robot
    robot = RobotController()
    
    # Start the Flask app and Angular frontend
    script_path = os.path.join(os.getcwd(), 'start_blossom.sh')
    subprocess.call(['bash', script_path])

if __name__ == "__main__":
    main()