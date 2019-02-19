from app import app
from app import search_manager
from app import pwned
from app import dnscheck
from app import pastebin
from app import get_data
from app import sensor_manager
from app import dread
from app import user
import json
import urllib.request
import urllib
import requests
from flask import Flask, jsonify, request

home = {'home' : 'this is the json returned to the homepage'}

@app.route('/dark/<string:sensor>', methods=['GET'])
def get_dark(sensor):
    getter = get_data.Get_Data()
    data = getter.get_dark(sensor)
    return(josnify(data))

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
@app.route('/add/', methods = ['GET', 'POST'])
def add_sensor():
    tag = request.args['sensorName']
    type = request.args['sensorType']
    sensor = request.args['sensorKeywords']
    #print(sensor, type, tag)
    add = sensor_manager.Sensor_Manager()
    add.addSensor(sensor,type,tag)
    data = {"Message":"We've added your sensor"}
    return (jsonify(data))

@app.route('/scan/', methods = ['GET'])
def scan():
    search = search_manager.Search_Manager()
    search.timedSearch()
    data = {"Message":"Scanning"}
    return(jsonify(data))

@app.route('/new_user/', methods = ['GET', 'POST'])
def addNewUser():
    name = request.args['name']
    email = request.args['email']
    phone = request.args['phone']
    frequency = request.args['frequency']
    user = user.user(name,email,phone,frequency)

@app.route('/')
@app.route('/index')
def index():
    return "This is the homepage!"
    # return jsonify(home)
