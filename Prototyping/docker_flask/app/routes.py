from app import app
import json
import urllib.request
import urllib
import requests
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


def get_pwned(email):
    pwned_url = "https://haveibeenpwned.com/api/v2/breachedaccount/" + email +"?includeUnverified=true"
    paste_url = "https://haveibeenpwned.com/api/v2/pasteaccount/" + email +"?includeUnverified=true"
    request  = requests.get(pwned_url)
    return (request.text)



@app.route('/search/<string:email>', methods=['GET'])
def get_tasks(email):
    #return jsonify({'messages': messages})
    return (get_pwned(email))

@app.route('/')
@app.route('/index')
def index():
    return "This is the homepage!"
    # return jsonify(home)
