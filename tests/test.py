from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/signup', methods=['GET'])
def signup():
    mock_user = {
        "username": "test_user_02",
        "password": "supersecretpassword1234"
    }
    return jsonify(mock_user), 200

@app.route('/change-password', methods=['GET'])
def change_password():
    mock_password_change = {
        "username": "test_user_02",
        "oldPassword": "supersecretpassword1234",
        "newPassword": "supersecretpassword123"
    }
    return jsonify(mock_password_change), 200

@app.route('/login', methods=['GET'])
def login():
    mock_login = {
        "username": "test_user_02",
        "password": "supersecretpassword123"
    }
    return jsonify(mock_login), 200

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
