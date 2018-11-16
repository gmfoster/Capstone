import urllib
import urllib.request
import requests
import json

class Pwned_Module():
    def __init__(self, url_1 ="https://haveibeenpwned.com/api/v2/breachedaccount/", url_2 ="?includeUnverified=true"):
        self.url_1 = url_1
        self.url_2 = url_2

    def search(self, email):
        url = self.url_1 + email + self.url_2
        response = requests.get(url)
        
        if response.status_code == 200:
            return (response.json())

        elif response.status_code == 400:
            error = {'Error 400' : 'Please enter a properly formatted email'}
            return (error)
        elif response.status_code == 403:
            error = {'Error 403' : 'No user agent has been specified in the request'}
            return (error)
        elif response.status_code == 404:
            error = {'Error 404' : 'Congratulations you have not been pwned'}
            return (error)

