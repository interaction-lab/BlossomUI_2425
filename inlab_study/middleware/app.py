from flask import Flask, jsonify
from flask_cors import CORS
from robot.controller import RobotController

app = Flask(__name__)
CORS(app)
robot = RobotController()

@app.route('/api/mode/<mode>', methods=['POST'])
def set_mode(mode):
    try:
        if mode == 'study':
            robot.study_mode()
        elif mode == 'training':
            robot.training_mode()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
