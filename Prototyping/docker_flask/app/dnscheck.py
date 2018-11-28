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

    def get_domain(self, domain):
        endpoint = '{}/domain/{}'.format(self.base_url, domain)
        r = self.session.get(endpoint)
        output = r.json()
        if r.status_code == 200:
            return(output)
        else:
            logger.warning("get_domain:Error with query to Security Trails, error message: {}".format(output['message']))

    def get_subdomain(self, domain):
        endpoint = '{}/domain/{}/subdomains'.format(self.base_url, domain)
        r = self.session.get(endpoint)
        output = r.json()
        # If the request is successful
        if r.status_code == 200:
            return (output)
        # Request failed returning false and logging an error
        else:
            logger.warning("get_subdomain:Error with query to Security Trails, error message: {}".format(output['message']))
            
    def get_tags(self, domain):
        endpoint = '{}/domain/{}/tags'.format(self.base_url, domain)
        # Make connection to the tags endpoint
        r = self.session.get(endpoint)
        output = r.json()
        # If the request is successful
        if r.status_code == 200:
            return (output)
        # Request failed returning false and logging an error
        else:
            logger.warning("get_tags:Error with query to Security Trails, error message: {}".format(output['message']))

    def get_whois(self, domain):
        endpoint = '{}/domain/{}/whois'.format(self.base_url, domain)
        # Make connection to the whois endpoint
        r = self.session.get(endpoint)
        output = r.json()
        # If the request is successful
        if r.status_code == 200:
            return (output)
        # Request failed returning false and logging an error
        else:
            logger.warning("get_whois:Error with query to Security Trails, error message: {}".format(output['message']))

    def get_history_dns(self, domain, record_type):
        record_type = record_type.lower()
        type_check = ['a', 'aaaa', 'mx', 'ns', 'txt', 'soa']

        if record_type in type_check:           
            endpoint = '{}/history/{}/dns/{}'.format(self.base_url, domain, record_type)
            r = self.session.get(endpoint)
            output = r.json()
            if r.status_code == 200:
                # Output results to json
                return (output)
            else:
                # Request failed returning false and logging an error
                # Output results to json
                output = r.json()
                logger.warning(
                    "get_history_dns:Error with query to Security Trails, error message: {}".format(
                        output['message']))
                return False

        # Request failed returning false and logging an error
        else:
            logger.warning("get_history_dns: Invalid type, valid types are {}.".format(
                str(", ".join(type_check))))
            return False
