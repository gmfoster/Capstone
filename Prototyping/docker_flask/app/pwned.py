import pyrebase
import hashlib
import re
import urllib
import urllib.request
import requests
import json

class Pwned_Module():
    def __init__(self):
        self.pwned_url_1 = "https://haveibeenpwned.com/api/v2/breachedaccount/"
        self.pwned_url_2 = "?includeUnverified=true"
        self.paste_url = "https://haveibeenpwned.com/api/v2/pasteaccount/"
        self.headers = {"User-Agent": "pwned-check-for-webapp"}
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



    def search(self, email):
        pwned_url = self.pwned_url_1 + email + self.pwned_url_2
        print(pwned_url)
        response = requests.get(pwned_url, headers=self.headers)
        id = hashlib.md5(email.encode()).hexdigest()
        status = response.status_code
        print(response)
        if not re.match("(\w+[-|.|\w])+@(\w+[.])+\w+", email, re.IGNORECASE):
            status = 400
            
        if status == 200:
            data = response.json()
            json_string = json.dumps(data)
            json_data = json.loads(json_string)
            #self.db.child("pwned_search").child(id).child("pwned").set(json_data)
            self.db.child("pwned_search").child(id).set(json_data)
            #return (len(data))
        elif status == 201:
            error = {"developerMessage" : "Created"} 
            return(error)
        elif status == 304:
            error = {"developerMessage" : "Not Modified"}
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
            error = {'404' : 'Congratulations your account has not been leaked in any data breaches'}
            #self.db.child("pwned_search").child(id).child("pwned").set(error)
            self.db.child("pwned_search").child(id).set(error)
            num = 0
            #return (num)
        elif status == 409:
            error = {'developerMessage' : 'Conflict'}
            return(error)
        elif status == 500:
            error = {'developerMessage' : 'Internal Server Error'}
            return(error)


'''        paste_url = self.paste_url + email
        print(paste_url)
        response = requests.get(paste_url, headers=self.headers)
        id = hashlib.md5(email.encode()).hexdigest()
        status = response.status_code
        print(response)
                  
        if status == 200:
            data = response.json()
            json_string = json.dumps(data)
            json_data = json.loads(json_string)
            self.db.child("pwned_search").child(id).child("paste").set(json_data)
            return (len(data))
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
            error = {'404' : 'Congratulations your account has not been found on any paste sites'}
            self.db.child("pwned_search").child(id).set(error)
            num = 0
            return (num)
        elif status == 409:
            error = {'developerMessage' : 'Conflict'}
            return(error)
        elif status == 500:
            error = {'developerMessage' : 'Internal Server Error'}
            return(error)'''

        
    
#testing
if __name__ == "__main__":
    pwned = Pwned_Module()
    pwned.search("hdr29@hrcoffice.com")
    
