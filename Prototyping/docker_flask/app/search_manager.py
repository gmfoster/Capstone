import time
from app import pwned
#import pwned
import pyrebase
import hashlib
from app import alert
#import alert
from app import dread
#import dread
from app import pastebin
#import pastebin
from app import user
#import user
from app import recentPastes
#import recentPastes
#Store sensors in database, in infinite look query database for all sensors 

class Search_Manager():
    def __init__(self):
        #self.pastebin_module = pastebin.Pastebin_Module()
        self.paste_sensors = dict() #dict to store hashed values of paste keywords
        self.paste_keywords = [] #array to store paste keywords for search
        self.pwned_sensors = dict() #dict to store hashed values of pwned keywords
        self.pwned_keywords = [] #array to store pwned keywords for search
        self.dark_sensors = dict() #dict to store hashed valuse of darknet keywords
        self.dark_keywords = [] #array to store darknet keywords

        self.pwned_module = pwned.Pwned_Module()
        self.dark_module = dread.Dread_Module()
        #self.paste_module = pastebin.Pastebin_Module()
        self.recent_pastes = recentPastes.Recent_Pastes()

        self.user = user.user()
        self.user.setName("stub")
        self.user.setEmail("stub")
        self.user.setFrequency(1)
        self.user.setPhone("stub")

        self.alert = alert.alert()
    #Firebase Config                                                                
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


    def getPasteSensors_old(self):
        self.paste_sensors = self.db.child("sensors").child("paste_sensors").get().val()
        seen = set(self.paste_keywords)
        for k, v in self.paste_sensors.items():
            for k1, v1 in v.items():
                if v1 not in seen:
                    seen.add(v1)
                    self.paste_keywords.append(v1)
        print(self.paste_keywords)

    def getPasteSensors(self):
        self.sensors = self.db.child("sensors").get().val()
        seen = set(self.paste_keywords)
        for k,v in self.sensors.items():
            for k1, v1 in v.items():
                if k1 == "paste_sensors":
                    for k2, v2 in v1.items():
                        for k3, v3 in v2.items():
                            if v3 not in seen:
                                seen.add(v3)
                                self.paste_keywords.append(v3)
        print(self.paste_keywords)

    def getPwnedSensors_old(self):
        self.pwned_sensors = self.db.child("sensors").child("pwned_sensors").get().val()
        seen = set(self.pwned_keywords)
        for k, v in self.pwned_sensors.items():
            for k1, v1 in v.items():
                if v1 not in seen:
                    seen.add(v1)
                    self.pwned_keywords.append(v1)
        print(self.pwned_keywords)

    def getPwnedSensors(self):
        self.sensors = self.db.child("sensors").get().val()
        seen = set(self.pwned_keywords)
        for k,v in self.sensors.items():
            for k1, v1 in v.items():
                if k1 == "pwned_sensors":
                    for k2, v2 in v1.items():
                        for k3, v3 in v2.items():
                            if v3 not in seen:
                                seen.add(v3)
                                self.pwned_keywords.append(v3)
        print(self.pwned_keywords)
                
                
    def getDarkSensors_old(self):
        self.dark_sensors = self.db.child("sensors").child("dark_sensors").get().val()
        seen = set(self.dark_keywords)
        for k, v in self.dark_sensors.items():
            for k1,v1 in v.items():
                if v1 not in seen:
                    seen.add(v1)
                    self.dark_keywords.append(v1)
        print(self.dark_keywords)

    def getDarkSensors(self):
        self.sensors = self.db.child("sensors").get().val()
        seen = set(self.dark_keywords)
        for k,v in self.sensors.items():
            for k1, v1 in v.items():
                if k1 == "dark_sensors":
                    for k2, v2 in v1.items():
                        for k3, v3 in v2.items():
                            if v3 not in seen:
                                seen.add(v3)
                                self.dark_keywords.append(v3)
        print(self.dark_keywords)
        
    def timedSearch(self):
        sent = 0
        count = 0
        pasteCount = 0
        darkCount = 0
        found = 0
        pwnedCount = 0
        newCount = 0
        firstTime = 0
        numPastes = 9999
        while(1):
        #start infinite loop                                                                          
            self.getPasteSensors() #get paste sensors
            if (len(self.paste_keywords) > numPastes):
                firstTime = 1
                numPastes = len(self.paste_keywords)
                
            if (len(self.paste_keywords) != 0):
                pasteCount = 0
                for i in range(len(self.paste_keywords)):             
                    if (firstTime == 1):
                        pasteCount = pasteCount + self.pastebin_module.search(self.paste_keywords[i]) #first time we run full paste scrape
                    else:
                        paste = self.recent_pastes.search(self.paste_keywords) #otherwise we scrape 25 most recent pastes
                        pasteCount = paste[0] + pasteCount
                        link = paste[1]
                #if(firstTime == 1):
                #    self.pastebin_module.close()
            self.getPwnedSensors() #get pwned sensors                                                 
            if (len(self.pwned_keywords) != 0):
                for i in range(len(self.pwned_keywords)):
                    pwnedCount = pwnedCount + self.pwned_module.search(self.pwned_keywords[i])

            self.getDarkSensors()
            #if (len(self.dark_keywords) != 0):
                #darkCount = darkCount + self.dark_module.run(self.dark_keywords) #currently broken due to captcah bullshit

            newCount = pwnedCount + darkCount
            found = newCount-count
            count =  newCount
            print("paste count = ", pasteCount)
            if(found > self.user.frequency and firstTime == 0):
                #self.alert.sendEmail(self.user.name, self.user.email)
                #self.alert.sendText(self.user.name, self.user.phone)
                print("sending alert")
            if(pasteCount > 0 and sent == 0):
                #self.alert.sendEmail(self.user.name, self.user.email)
                self.alert.sendText(self.user.name, self.user.phone,link)
                print("sending alert")
                sent = 1
            pasteCount = 0
            pwnedCount = 0
            darkCount = 0
            found = 0
            firstTime = 0
            print("Sleeping for 0 second")
            #time.sleep(1)

if __name__ == "__main__":
    manager = Search_Manager()
#    manager.getPwnedSensors()
#    manager.getDarkSensors()
#    manager.getPasteSensors()
    manager.timedSearch()
