import re
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
        
        status = response.status_code

        if not re.match("(\w+[-|.|\w])+@(\w+[.])+\w+", email, re.IGNORECASE):
            status = 400

        if status == 200:
            return (response.json())
        elif status == 201:
            error = {"developerMessage" : "Created"} 
            return(error)
        elif status == 304:
            error = {"developerMessage" : "Not Midified"}
            return(error)
        elif status == 400:
            error = {'developerMessage' : 'Bad Request'}
            return (error)
        elif status == 401:
            error = {'developerMessage' : 'Not Authorized'}
            return(error)
        elif status == 403:
            error = {'Error 403' : 'No user agent has been specified in the request'}
            return (error)
        elif status == 404:
            error = {'Error 404' : 'Congratulations you have not been pwned'}
            return (error)
        elif status == 409:
            error = {'developerMessage' : 'Conflict'}
            return(error)
        elif status == 500:
            error = {'developerMessage' : 'Internal Server Error'}
            return(error)
