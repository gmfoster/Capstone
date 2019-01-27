import pyrebase
import pastebin
import hashlib
#Store sensors in database, in infinite look query database for all sensors 
class Manager():
    def __init__(self):
        #self.pastebin_module = pastebin.Pastebin_Module()
        self.paste_sensors = dict() #dict to store hashed values of paste keywords
        self.paste_keywords = [] #array to store paste keywords for search
        self.pwned_sensors = dict() #dict to store hashed values of pwned keywords
        self.pwned_keywords = [] #array to store pwned keywords for search
        self.dark_sensors = dict() #dict to store hashed valuse of darknet keywords
        self.dark_keywords = [] #array to store darknet keywords


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


    def getSensors(self):
        self.paste_sensors = self.db.child("sensors").child("paste_sensors").get().val()
        for k, v in self.paste_sensors.items():
            for k1, v1 in v.items():
                self.paste_keywords.append(v1)
        print(self.paste_keywords)
    
    def pasteTimedSearch(self):
        while(1):
            
            if (len(self.paste_keywords) != 0):
                for i in range(len(self.paste_keywords)):
                    paste = pastebin.Pastebin_Module()
                    paste.search(self.paste_keywords[i])
                time.sleep(15)

    

if __name__ == "__main__":
    manager = Manager()
    #manager.pasteTimedSearch()
    manager.getSensors()
       
