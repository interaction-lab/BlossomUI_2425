from flask import Flask, jsonify, request
from flask_cors import CORS
from robot.controller import RobotController

app = Flask(__name__)
CORS(app)  # Enable CORS for Angular frontend

robot = RobotController()

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({'status': 'online'})

@app.route('/api/move', methods=['POST'])
def move_robot():
    data = request.get_json()
    direction = data.get('direction')
    speed = data.get('speed', 50)  # default speed 50%
    
    try:
        if direction == 'forward':
            robot.move_forward(speed)
        elif direction == 'backward':
            robot.move_backward(speed)
        elif direction == 'left':
            robot.turn_left(speed)
        elif direction == 'right':
            robot.turn_right(speed)
        return jsonify({'success': True, 'message': f'Moving {direction}'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/stop', methods=['POST'])
def stop_robot():
    robot.stop()
    return jsonify({'success': True, 'message': 'Robot stopped'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
