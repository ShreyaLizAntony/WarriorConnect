from flask import Flask, request, jsonify
from database_handler import handle_parse_and_store

app = Flask(__name__)

@app.route('/') # ‘https://www.google.com/‘

def home():
	return "Hello, world!"

@app.route('/parse', methods=['POST'])

def parse_and_store_courses():
    return handle_parse_and_store(request)

app.run(port=5000)