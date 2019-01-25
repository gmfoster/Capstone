from app import app
from app import manager
from app import pwned
from app import dnscheck
import json
import urllib.request
import urllib
import requests
from flask import Flask, jsonify

home = {'home' : 'this is the json returned to the homepage'}


@app.route('/search/<string:email>', methods=['GET'])
def get_tasks(email):
    p = pwned.Pwned_Module()
    response = p.search(email)
    return (jsonify(response))

@app.route('/analyze/<string:module>/<string:args>')
def analyze(module, args):
    #m = manager.Manager()
    #response = m.analyze()
    return "This is a stub!"

@app.route('/progress/<string:module>/<string:args>')
def progress(module, args):
    #m = manager.Manager()
    #response = m.progress()
    return "This is a stub!"

@app.route('/report/<string:module>/<string:args>')
def report(module, args):
    #m = manager.Manager()
    #response = m.report()
    return "This is a stub!"


@app.route('/')
@app.route('/index')
def index():
    return "This is the homepage!"
    # return jsonify(home)
