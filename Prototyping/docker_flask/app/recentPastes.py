import datetime
import pyrebase
import hashlib
import re
import urllib
import urllib.request
import requests
import json
import time

class Recent_Pastes():
    def __init__(self):
        self.url = 'https://scrape.pastebin.com/api_scraping.php?limit=25'
        self.keys = []
        self.config = {
            "apiKey": "AIzaSyCGkOiKMSxR9NRM-d1WkC2kEYOGp2d8j5k",
            "authDomain": "novacoast-capstone.firebaseapp.com",
            "databaseURL": "https://novacoast-capstone.firebaseio.com",
            "projectId": "novacoast-capstone",
            "storageBucket": "novacoast-capstone.appspot.com",
            "messagingSenderId": "1039131724249"
        }
        self.firebase = pyrebase.initialize_app(self.config)
        self.db = self.firebase.database()

        
    def search(self, keyword):
        try:
            response = requests.get(self.url)
            print(response.text)
            json_response = response.json()
        except Exception as e:
            print("Exception: ",e)
            pass
        id = hashlib.md5(keyword.encode()).hexdigest()
        scrape_data = ""
        for items in json_response:
            i = items['scrape_url']
            #p = items['key']
            #scrape_data = scrape_data + p + '\n'
            print(items['scrape_url'])
            #if (p == keyword):
            #    print("match!")
            scrape = requests.get(i)
            text = scrape.text
            if (text.find(keyword) != -1):
                print("Found Word In Paste: ", items['key'])
                print(scrape.text)
                self.keys.append(items['key'])
            time.sleep(.7)
        #print(self.keys)
        link = ''
        for l in self.keys:
            currentDT = datetime.datetime.now()
            currentTime = currentDT.strftime("%d:%I:%M:%S")
            data = {"link":"http://pastebin.com/" + l, "time(day:hour:minute:second)":currentTime}
            link = "http://pastebin.com/" + l
            self.db.child("paste_search").child(id).child(l).set(data)
        return(len(self.keys),link)
        

#if __name__ == "__main__":
#    paste = Recent_Pastes()
#    paste.search('TEST')
#    keyword = "5973"
#    id = hashlib.md5(keyword.encode()).hexdigest()
#    print(id)
