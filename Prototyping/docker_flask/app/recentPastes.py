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
        self.url = 'https://scrape.pastebin.com/api_scraping.php?limit=15'
        self.keys = []
        self.times = []
        self.keywords = []
        self.previews = []
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

        
    def search(self, keywords):
        try:
            response = requests.get(self.url)
            print(response.text)
            json_response = response.json()
        except Exception as e:
            print("Exception: ",e)
            pass
        
        scrape_data = ""
        for items in json_response:
            dict = {"i":items['scrape_url'],"j":items['date']}
            #p = items['key']
            #scrape_data = scrape_data + p + '\n'
            print(items['scrape_url'])
            #if (p == keyword):
            #    print("match!")
            scrape = requests.get(dict["i"])
            date = dict["j"]
            #print(date)
            text = scrape.text
            for keyword in keywords:
                print(keyword)
                if (text.find(keyword) != -1):
                    print("Found Word In Paste: ", items['key'])
                    print(scrape.text)
                
                    keywordSplit = keyword.split()
                    keywordSplitText = keywordSplit[0]
                    split = text.split()
                    location = split.index(keywordSplitText)
                    start = location - 5
                    if (start < 0):
                        start = 0
                    end = location + 5 + len(keywordSplit) - 1
                    if (end > len(split)):
                        end = len(split)
                    preview = split[start:end]
                    previewText = ""
                    for word in preview:
                        previewText = previewText + " " + word
                    print("Preview: ", previewText)
                    self.keywords.append(keyword)
                    self.previews.append(previewText)
                    self.keys.append(items['key'])
                    self.times.append(date)
            time.sleep(.7)
        #print(self.keys)
        link = []
        for l,t,p,k in zip(self.keys, self.times, self.previews, self.keywords):
            currentDT = datetime.datetime.now()
            currentTime = currentDT.strftime("%d:%I:%M:%S")
            data = {"link":"http://pastebin.com/" + l, "time discovered(day:hour:minute:second)":currentTime, "time posted":t, "preview":p}
            link.append("http://pastebin.com/" + l)
            id = hashlib.md5(k.encode()).hexdigest()
            self.db.child("paste_search").child(id).child(l).set(data)
        print("about to return")
        return(len(self.keys),link)
        

#if __name__ == "__main__":
#    paste = Recent_Pastes()
#    keywords = ['Graham Test','Second Test']
#    while(1):
#        paste.search(keywords)
#    keyword = "5973"
#    id = hashlib.md5(keyword.encode()).hexdigest()
#    print(id)
