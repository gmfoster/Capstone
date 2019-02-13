import time
from app import pwned
#import pwned: to run standalone you need to just import, not from app
import pyrebase
import hashlib
from app import alert
#import alert
from app import dread
#import dread
from app import pastebin
#import pastebin

#Store sensors in database, in infinite look query database for all sensors 

class Search_Manager():
    def __init__(self, name = "", email = "", phone = "", frequency = 5):
        self.name = name
        self.email = email
        self. phone = phone
        self.frequency = frequency
        #self.pastebin_module = pastebin.Pastebin_Module()
        self.paste_sensors = dict() #dict to store hashed values of paste keywords
        self.paste_keywords = [] #array to store paste keywords for search
        self.pwned_sensors = dict() #dict to store hashed values of pwned keywords
        self.pwned_keywords = [] #array to store pwned keywords for search
        self.dark_sensors = dict() #dict to store hashed valuse of darknet keywords
        self.dark_keywords = [] #array to store darknet keywords
        self.pwned_module = pwned.Pwned_Module()
        self.dark_module = dread.Dread_Module()
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


    def getPasteSensors(self):
        self.paste_sensors = self.db.child("sensors").child("paste_sensors").get().val()
        seen = set(self.paste_keywords)
        for k, v in self.paste_sensors.items():
            for k1, v1 in v.items():
                if v1 not in seen:
                    seen.add(v1)
                    self.paste_keywords.append(v1)
        print(self.paste_keywords)

    def getPwnedSensors(self):
        self.pwned_sensors = self.db.child("sensors").child("pwned_sensors").get().val()
        seen = set(self.pwned_keywords)
        for k, v in self.pwned_sensors.items():
            for k1, v1 in v.items():
                if v1 not in seen:
                    seen.add(v1)
                    self.pwned_keywords.append(v1)
        print(self.pwned_keywords)    

<<<<<<< HEAD
    def getDarkSensors(self):
        self.dark_sensors = self.db.child("sensors").child("dark_sensors").get().val()
        seen = set(self.dark_keywords)
        for k, v in self.dark_sensors.items():
            for k1,v1 in v.items():
                if v1 not in seen:
                    seen.add(v1)
                    self.dark_keywords.append(v1)
        print(self.dark_keywords)
        
    def timedSearch(self):        
        while(1):
        #start infinite loop
            self.getPasteSensors() #get paste sensors
            #if (len(self.paste_keywords) != 0):
                #for i in range(len(self.paste_keywords)):
                    #paste = pastebin.Pastebin_Module()
                    #paste.search(self.paste_keywords[i])
                    #print("searching paste: " + self.paste_keywords[i])
            self.getPwnedSensors() #get pwned sensors
            if (len(self.pwned_keywords) != 0):
                for i in range(len(self.pwned_keywords)):
                    self.pwned_module.search(self.pwned_keywords[i])
            #if(pwned_module.search found something || paste.search found something):                
                #self.alertUser.sendEmail(self.name, self.email)                                                    #  self.alertUser.sendText(self.phone)
            self.getDarkSensors()
            if (len(self.dark_keywords) != 0):
                self.dark_module.run(self.dark_keywords)
            print("Sleeping for 5 seconds")
            time.sleep(5)
    
=======
def timedSearch(self):
        int count = 0;
        int pasteCount = 0
        int found, pwnedCount = 0, newCount
        int firstTime = 1
        while(1):
        #start infinite loop                                                                          
            self.getPasteSensors() #get paste sensors                                                 
            if (len(self.paste_keywords) != 0):
                int pasteCount = 0
                for i in range(len(self.paste_keywords)):
                    #paste = pastebin.Pastebin_Module()                                               
                    #pasteCount = pasteCount + self.paste.search(self.paste_keywords[i])              
                    print("searching paste: " + self.paste_keywords[i])
            self.getPwnedSensors() #get pwned sensors                                                 
            if (len(self.pwned_keywords) != 0):
                for i in range(len(self.pwned_keywords)):
                    #pwned = pwned.Pwned_Module()                                                     
                    pwnedCount = pwnedCount + self.pwned_module.search(self.pwned_keywords[i])
            newCount = pwnedCount + pasteCount
            found = newCount-count
            count =  newCount
            if(found > self.frequency and firtTime = 0):
                self.alertUser.sendEmail(self.name, self.email)
                self.alertUser.sendText(self.phone)
            pasteCount = 0;
            pwnedCount = 0;
            found = 0;
            print("Sleeping for 15 seconds")
            time.sleep(15)
            firstTime = 0
>>>>>>> bbc99b26a4afe256c69e2c91d69af80e85bcb5cc

#if __name__ == "__main__":
#    manager = Search_Manager()
#    manager.timedSearch()
 #   manager.getPwnedSensors()
       
