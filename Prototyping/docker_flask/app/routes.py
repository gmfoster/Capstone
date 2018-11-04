from app import app
import json
from flask import Flask, jsonify

messages = [
    {
        'id': 1,
        'title': 'SearchResult1',
        'description': 'description for Title1',
        'done': False
    },
    {
        'id': 1,
        'title': 'SearchResult2',
        'description': 'description for Title2',
        'done': False
    }
]

home = {'home' : 'this is the json returned to the homepage'}


@app.route('/search', methods=['GET'])
def get_tasks():
    return jsonify({'messages': messages})


@app.route('/')
@app.route('/index')
def index():
    return "This is the homepage!"
    # return jsonify(home)
