class user():
        def __init__(self):
                self.name = ""
                self.email = ""
                self.phone = ""
                self.frequency = 5
                self.password = ""
                
        def setName(self, name):
                self.name = name

        def setEmail(self, email):
                self.email = email

        def setPhone(self, phone):
    	        self.phone = phone
                
        def setFrequency(self, frequency):
    	        self.frequency = frequency

        def setFrequency(self, password):
    	        self.frequency = password

        def getName(self):
    	        return self.name

        def getEmail(self):
    	        return self.email

        def getPhone(self):
    	        return self.phone

        def getFrequency(self):
    	        return self.frequency

        def getPassword(self):
    	        return self.password
