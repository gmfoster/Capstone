import pyrebase
import hashlib
import collections


class Get_Data():
    def __init__(self):
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


    def get_pwned(self, email):
        id = hashlib.md5(email.encode()).hexdigest()
        data =  self.db.child("pwned_search").child(id).get()
        return(data.val())

    def get_paste(self, sensor):
        id = hashlib.md5(sensor.encode()).hexdigest()
        data =  self.db.child("paste_search").child(id).get()
        return(data.val())
    
    def get_virus(self, url):
        id = hashlib.md5(url.encode()).hexdigest()
        data = self.db.child("virus_total").child(id).get()
        print(data.val())
        return(data.val())

#if __name__ == "__main__":
#    getter = Get_Data()
#    getter.get_virus("http://www.virustotal.com/")
