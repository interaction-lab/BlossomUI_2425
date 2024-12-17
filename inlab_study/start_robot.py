# start_robot.py
import sys
import os

# Add the middleware directory to Python path if needed
robot_path = os.path.join(os.path.dirname(__file__), 'middleware/robot')
if os.path.exists(robot_path):
    sys.path.append(robot_path)

try:
    from controller import RobotController #change from robot_control to controller
except ModuleNotFoundError:
    print("Error: Could not find robot_control module.")
    print(f"Looking in: {os.getcwd()}")
    print(f"Python path: {sys.path}")
    sys.exit(1)

def main():
    try:
        # Initialize robot
        robot = RobotController()
        # Add your robot control logic here
    except Exception as e:
        print(f"Error initializing robot: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()