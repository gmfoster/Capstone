from app import pwned

class Module():
    def __init__(self):
        self.pwnedModule = pwned.Pwned_Module()
        #self.darkModule = 
        #self.pasteModule = 
        
        
    def searchEmail(self, email):
        self.pwnedModule.search(email)
        #self.darkModule.search(email)
        #self.pasteModule.search(email)
        
    def searchName(self, name):
        #self.pasteModule.search(name)
        #self.darkModule.search(name)
        stub = "this is a stub"
        return stub

    def searchIp(self, ipAddress):
        #self.pasteModule.search(name)
        #self.darkModule.search(name)
        stub = "this is a stub"
        return stub