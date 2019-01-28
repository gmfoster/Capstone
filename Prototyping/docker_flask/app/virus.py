import pyrebase
import hashlib
import re
import urllib
import urllib.request
import requests
import json

class Virus():
    def __init__(self):
        self.api_key = 'dc48fa5dd4f6a378c776b4ad22a23f3dbaa75e6fb376da1ce1a593d6753eea06'
        
        self.headers = {"Accept-Encoding": "gzip, deflate", "User-Agent" : "gzip,  My Python requests library example client or username"}



#Firebase Config                                                                       
        config = {
            "apiKey": "AIzaSyCGkOiKMSxR9NRM-d1WkC2kEYOGp2d8j5k",
            "authDomain": "novacoast-capstone.firebaseapp.com",
            "databaseURL": "https://novacoast-capstone.firebaseio.com",
            "projectId": "novacoast-capstone",
            "storageBucket": "novacoast-capstone.appspot.com",
            "messagingSenderId": "1039131724249"
        }
        self.firebase = pyrebase.initialize_app(config)
        self.db = self.firebase.database()


    def url_search(self,url):
        params = {'apikey':self.api_key, 'url':url}
        id = hashlib.md5(url.encode()).hexdigest()
        response = requests.post('https://www.virustotal.com/vtapi/v2/url/scan', data=params)
        json_response = response.json()
        link = json_response.get('permalink')
        data = {"report":link}
        self.db.child("virus_total").child(id).set(data)
        print(json_response)
        return(json_response)

    
    def get_url_report(self,url):
        params = {'apikey':self.api_key, 'resource':url}
        id = hashlib.md5(url.encode()).hexdigest()
        response = requests.post('https://www.virustotal.com/vtapi/v2/url/report',
  params=params, headers=self.headers)
        print(response)
        data = response.json()
        json_string = json.dumps(data)
        json_data = json.loads(json_string)
        print(json_data)
        self.db.child("virus_total").child(id).set(json_string)
            
        return(data)


if __name__ == "__main__":
    url = "http://www.virustotal.com/"
    virus = Virus()
#    virus.url_search(url)
    virus.get_url_report(url)
