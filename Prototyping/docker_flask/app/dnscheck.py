import re
import urllib
import urllib.request
import requests
import json
import logging

logging.basicConfig()
logger = logging.getLogger('DNS_Check')

class DNS_Check():
    def __init__(self, api_key, base_url = 'https://api.securitytrails.com/v1/'):
        
        self.session = requests.session()
        self.session.headers.update({'APIKEY': api_key})
        self.base_url = base_url
        self.api_key = api_key
        self.ping = self.session.get(base_url + "ping")
        
        
    def test(self):
        if self.ping.status_code != 200:
            logger.error(
                "Error connecting to Security Trails, error message: {}".format(
                    self.ping.text))
        
    
    def test_connect(self):
        endpoint = '{}/ping/'.format(self.base_url)
        r = self.session.get(endpoint)
        # Specify Output as JSON
        output = r.json()
        # If the request is successful
        if r.status_code == 200:
            print ("true")
            return (True)
        # Request failed returning false and logging an error
        else:
            logger.warning("get_domain:Error with query to Security Trails, error message: {}".format(output['message']))
            return (False)

    def get_domain(self,domain):
        endpoint = '{}/domain/{}'.format(self.base_url, domain)
        r = self.session.get(endpoint)
        output = r.json()
        if r.status_code == 200:
            return(output)
        else:
            logger.warning("get_domain:Error with query to Security Trails, error message: {}".format(output['message']))

s = DNS_Check(api_key='HNscMl31tmTNfEuMttLO3xVUZ5HrY9Mj')
#s.test()
#s.test_connect()
s.get_domain('netflix.com')
