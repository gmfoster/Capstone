import pastebin
import hashlib
#Store sensors in database, in infinite look query database for all sensors 
class Manager():
    def __init__(self):
        #self.pastebin_module = pastebin.Pastebin_Module()
        self.paste_sensor = dict() #dict to store hashed values of paste keywords
        self.paste_keywords = [] #array to store paste keywords for search
        self.pwned_sensor = dict() #dict to store hashed values of pwned keywords
        self.pwned_keywords = [] #array to store pwned keywords for search
        self.dark_sensor = dict() #dict to store hashed valuse of darknet keywords
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


    def addPasteSensor(self, sensor):
        self.paste_keywords.append(sensor)
        hash = hashlib.md5(sensor.encode()).hexdigest()
        self.paste_sensor[sensor] = hash
        
    def getNewSensor(self, sensor, type):  #might not need this???
        #this will run in loop with timer
        if(type == "paste"):
            self.addPasteSensor(sensor)

        elif(type == "pwned"):
            #stub, process pwned here
            return;
        
        elif(type == "dark"):
            #stub, process dark here
            return;

    def pasteTimedSearch(self):
        while(1):
            if (len(self.paste_keywords) != 0):
                for i in range(len(self.paste_keywords)):
                    paste = pastebin.Pastebin_Module()
                    paste.search(self.paste_keywords[i])
                time.sleep(15)
    
    def getUserInput(self): #testing multiprocessing
        while(1):
            sensor = input("Add new sensor: ")
            self.getNewSensor(sensor, "paste")
            print(self.paste_keywords)
            print(self.paste_sensor)

if __name__ == "__main__":
    manager = Manager()
    manager.pasteTimedSearch()
   
       
