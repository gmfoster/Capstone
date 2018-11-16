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
        return (response.json())

