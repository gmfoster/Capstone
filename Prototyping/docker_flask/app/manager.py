import time
import pwned
import pyrebase
import hashlib
import alert
#Store sensors in database, in infinite look query database for all sensors 

class Manager():
    def __init__(self, name = "No name", email = "nobody@nowhere.com", phone = "+18005550000"):
        self.name = name
        self.email = email
        self.phone = phone
        #self.pastebin_module = pastebin.Pastebin_Module()
        self.paste_sensors = dict() #dict to store hashed values of paste keywords
        self.paste_keywords = [] #array to store paste keywords for search
        self.pwned_sensors = dict() #dict to store hashed values of pwned keywords
        self.pwned_keywords = [] #array to store pwned keywords for search
        self.dark_sensors = dict() #dict to store hashed valuse of darknet keywords
        self.dark_keywords = [] #array to store darknet keywords
        self.pwned_module = pwned.Pwned_Module()
        self.alertUser = alert()

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

    def timedSearch(self):
        int count = 0;
        int pasteCount = 0
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
            if(found > 5&& firstTime = 0):
                self.alertUser.sendEmail(self.name, self.email)
                self.alertUser.sendText(self.phone)
            pasteCount = 0;
            pwnedCount = 0;
            found = 0;
            print("Sleeping for 15 seconds")
            time.sleep(15)
            firstTime = 0
    

if __name__ == "__main__":
    manager = Manager()
    manager.timedSearch()
 #   manager.getPwnedSensors()
       
