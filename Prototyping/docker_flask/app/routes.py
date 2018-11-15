from app import app
from app import manager
from app import pwned
import json
import urllib.request
import urllib
import requests
from flask import Flask, jsonify

home = {'home' : 'this is the json returned to the homepage'}


def get_pwned(email):
    pwned_url = "https://haveibeenpwned.com/api/v2/breachedaccount/" + email +"?includeUnverified=true"
    paste_url = "https://haveibeenpwned.com/api/v2/pasteaccount/" + email +"?includeUnverified=true"
    request  = requests.get(pwned_url)
    return (request.json())



@app.route('/search/<string:email>', methods=['GET'])
def get_tasks(email):
    #return (jsonify(get_pwned(email)))
    test = pwned.Pwned_Module()
    return (jsonify(test.search(email)))

@app.route('/')
@app.route('/index')
def index():
    return "This is the homepage!"
    # return jsonify(home)
