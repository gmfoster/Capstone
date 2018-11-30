import urllib
import urllib.request
import requests
import json
from selenium import webdriver
from sys import platform
import os

class Pastebin_Module():
    def __init__(self):
        #initialize something
        dirPath = os.path.dirname(os.path.realpath(__file__))
        self.moduleName = "Pastebin"
        if platform == "linux" or platform == "linux2":
            subDir = "linux/chromedriver"
        elif platform == "darwin":
            subDir = "mac/chromedriver"
        elif platform == "win32":
            subDir = "windows/chromedriver.exe"
        self.driverDirectory = dirPath + "/chromedriver/" + subDir
        self.browser = webdriver.Chrome(self.driverDirectory)
    
    #def search(self, searchTerm):
        #header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'}
        
        #search = requests.get("http://pastebin.com/search?q="+searchTerm, headers = header)
        #print(search)
        #print(search.text)
        #print(search.json)

    def seleniumSearch(self, searchTerm):
        self.browser.get("https://www.pastebin.com/search?q="+searchTerm)
        

if __name__ == "__main__":
    paste = Pastebin_Module()
    paste.seleniumSearch("umail.ucsb.edu")
