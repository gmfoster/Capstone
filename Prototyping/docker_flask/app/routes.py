from app import app
from app import manager
from app import pwned
from app import dnscheck
from app import pastebin
from app import get_data
import json
import urllib.request
import urllib
import requests
from flask import Flask, jsonify

home = {'home' : 'this is the json returned to the homepage'}


@app.route('/search/<string:email>', methods=['GET'])
def get_pwned(email):
    getter = get_data.Get_Data()
    data = getter.get_pwned(email)
    return(jsonify(data))

@app.route('/paste/<string:sensor>', methods=['GET'])
def get_paste(sensor):
    getter = get_data.Get_Data()
    data = getter.get_paste(sensor)
    return (jsonify(data))

@app.route('/virus/<string:url>', methods = ['GET'])
def get_virus(url):
#not sure how to get this to work since we cant enter a the actual url in the route
    getter = get_data.Get_Data()
    data = getter.get_virus(url)
    return (jsonify(data))


@app.route('/')
@app.route('/index')
def index():
    return "This is the homepage!"
    # return jsonify(home)
