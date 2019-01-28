#MIGHT NOT NEED THIS CLASS, IF WE ARE ADDING SENSORS FROM THE FRONTEND
import pyrebase
import hashlib
import collections

class Sensor_Manager():
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


    def addSensor(self, sensor, type):
        if (type == "paste"):
            id = hashlib.md5(sensor.encode()).hexdigest()
            data = {"sensor":sensor}
            self.db.child("sensors").child("paste_sensors").child(id).set(data)
        
        elif (type == "pwned"):
            id = hashlib.md5(sensor.encode()).hexdigest()
            data = {"sensor":sensor}
            self.db.child("sensors").child("pwned_sensors").child(id).set(data)

        elif (type == "dark"):
            id = hashlib.md5(sensor.encode()).hexdigest()
            data = {"sensor":sensor}
            self.db.child("sensors").child("dark_sensors").child(id).set(data)

        elif (type == "virus"): 
            id = hashlib.md5(sensor.encode()).hexdigest()
            data = {"sensor":sensor}
            self.db.child("sensors").child("virus_sensors").child(id).set(data)


#testing
#if __name__ == "__main__":
#    Sensor_Manager = Sensor_Manager()
#    Sensor_Manager.addSensor("umail.ucsb.edu", "paste")
#    Sensor_Manager.addSensor("graham", "paste")
#    sensors = Sensor_Manager.db.child("sensors").child("paste_sensors").get()
#    values = sensors.val()
#    print(values)
#    t = []
#    for k, v in values.items():
#        for k1, v1 in v.items():
#            t.append(v1)
#    print(t)



