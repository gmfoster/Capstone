import urllib
import urllib.request
import requests
import pyrebase
import json
import hashlib
from flask import Flask, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from sys import platform
import os
import time

class Pastebin_Module():
    def __init__(self):
        #initialize something
        print("This is a " + platform + "machine.")
        dirPath = os.path.dirname(os.path.realpath(__file__))
        self.moduleName = "Pastebin"
        if platform == "linux" or platform == "linux2":
            subDir = "linux/chromedriver"
        elif platform == "darwin":
            subDir = "mac/chromedriver"
        elif platform == "win32":
            subDir = "windows/chromedriver.exe"
        self.driverDirectory = dirPath + "/chromedriver/" + subDir
        self.chrome_options = Options()
        #self.chrome_options.add_argument('headless')
        self.browser = webdriver.Chrome(self.driverDirectory, options = self.chrome_options)
    
    #def search(self, searchTerm):
        #header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'}
        
        #search = requests.get("http://pastebin.com/search?q="+searchTerm, headers = header)
        #print(search)
        #print(search.text)
        #print(search.json)
        

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



    def seleniumSearch(self, searchTerm):
        pasteKeys = []
        urls = []
        numPages = 1
        currentPage = 1

        self.browser.get("https://www.pastebin.com/search?q="+searchTerm)
        pageRoot = self.browser.find_element_by_class_name("gsc-cursor")
        pageRootChildren = pageRoot.find_elements_by_css_selector("*")

        if(len(pageRootChildren) != 0):
            numPages = len(pageRootChildren)

        #print("Number of pages: " + str(numPages))

        while(currentPage <= numPages):
            elementRoots = []
            elementRoots = self.browser.find_elements_by_css_selector(".gs-webResult.gs-result")
            for element in elementRoots:
                try:
                    e = element.find_element_by_css_selector(".gs-bidi-start-align.gs-visibleUrl.gs-visibleUrl-long")
                    #print("Adding paste url: " + str(e.text))
                    #print("Current Page is " + str(currentPage))
                    urls.append(str(e.text))
                except:
                    print("No urls because search results returned an empty page")

            #print("Number of urls found on this page: " + str(len(urls)))

            #for element in urls:
                #print(element)

            if(currentPage < numPages):
                try:
                    pageRootChildren[currentPage].click()
                except:
                    print("Stale link/pastebin error")
            currentPage = currentPage + 1

        self.browser.close()
        for element in urls:
            if(element != ""):
                pasteKey = element.split("pastebin.com/")
                if(pasteKey[1] not in pasteKeys):
                    pasteKeys.append(pasteKey[1])
        
        print(pasteKeys)
        
        return pasteKeys

    def scrapingApiFromKeys(self, pasteKeys, id):
        for i in range(len(pasteKeys)):
            response = requests.get("http://scrape.pastebin.com/api_scrape_item.php?i=" + pasteKeys[i])
            data = {"content":response.text}
            #data = response.json()
            self.db.child("paste_search").child(id).child(pasteKeys[i]).set(data)
            #print(response.text)
            #self.db.child("test").push({"links":response.text})
            time.sleep(1)

    def search(self, keyword):
        results = []
        keys = self.seleniumSearch(keyword)
        id = hashlib.md5(keyword.encode()).hexdigest()
        data = ""
        for i in range(len(keys)):
            self.db.child("paste_search").child(id).child(keys[i]).set(data)
        
        results = self.scrapingApiFromKeys(keys, id)
        return results
        
                                      
if __name__ == "__main__":
    paste = Pastebin_Module()
    paste.search("umail.ucsb.edu")
