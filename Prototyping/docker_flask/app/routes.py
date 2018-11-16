from app import app
from app import manager
from app import pwned
import json
import urllib.request
import urllib
import requests
from flask import Flask, jsonify

home = {'home' : 'this is the json returned to the homepage'}


@app.route('/search/<string:email>', methods=['GET'])
def get_tasks(email):
    test = pwned.Pwned_Module()
    response = test.search(email)
    return (jsonify(response))

@app.route('/')
@app.route('/index')
def index():
    return "This is the homepage!"
    # return jsonify(home)
