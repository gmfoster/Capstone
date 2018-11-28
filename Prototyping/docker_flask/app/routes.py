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

@app.route('/domain/<string:domain>/<string:record_type>', methods=['GET'])
def get_domain(domain,record_type):
    s = dnscheck.DNS_Check(api_key='HNscMl31tmTNfEuMttLO3xVUZ5HrY9Mj')
    response = s.get_history_dns(domain,record_type)
    return (jsonify(response))

@app.route('/')
@app.route('/index')
def index():
    return "This is the homepage!"
    # return jsonify(home)
