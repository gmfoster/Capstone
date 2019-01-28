from app import app
from app import search_manager
from app import pwned
from app import dnscheck
from app import pastebin
from app import get_data
from app import sensor_manager
import json
import urllib.request
import urllib
import requests
from flask import Flask, jsonify

home = {'home' : 'this is the json returned to the homepage'}


@app.route('/pwned/<string:email>', methods=['GET'])
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

#testing
@app.route('/add/<string:sensor>/<string:type>', methods = ['GET'])
def add_sensor(sensor,type):
    add = sensor_manager.Sensor_Manager()
    add.addSensor(sensor,type)
    data = {"Message":"We've added your sensor"}
    return (jsonify(data))

@app.route('/scan/', methods = ['GET'])
def scan():
    search = search_manager.Search_Manager()
    search.timedSearch()
    data = {"Message":"Scanning"}
    return(jsonify(data))
    
@app.route('/')
@app.route('/index')
def index():
    return "This is the homepage!"
    # return jsonify(home)
