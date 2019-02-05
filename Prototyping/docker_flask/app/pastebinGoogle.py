import urllib
import urllib.request
import requests
import pyrebase
import json
import hashlib
from flask import Flask, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException,StaleElementReferenceException
from sys import platform
from sys import argv
import os
import time
from googlesearch import search

class PastebinGoogle_Module():
    def __init__(self):
        #initialize something
        print("This is a " + platform + "machine.")
        dirPath = os.path.dirname(os.path.realpath(__file__))
        self.moduleName = "Pastebin"
        if(platform == "linux" or platform == "linux2"):
            if("wsl" in argv):
                print("Took wsl branch")
                subDir = "windows/chromedriver.exe"
            else:
                subDir = "linux/chromedriver"
        elif(platform == "darwin"):
            subDir = "mac/chromedriver"
        elif(platform == "win32"):
            subDir = "windows/chromedriver.exe"
        self.driverDirectory = dirPath + "/chromedriver/" + subDir
        self.chrome_options = Options()
        #self.chrome_options.add_argument('headless')
        self.browser = webdriver.Chrome(self.driverDirectory, options = self.chrome_options)
    
        #Firebase Config
        self.config = {
            "apiKey": "AIzaSyCGkOiKMSxR9NRM-d1WkC2kEYOGp2d8j5k",
            "authDomain": "novacoast-capstone.firebaseapp.com",
            "databaseURL": "https://novacoast-capstone.firebaseio.com",
            "projectId": "novacoast-capstone",
            "storageBucket": "novacoast-capstone.appspot.com",
            "messagingSenderId": "1039131724249"
        }
        self.firebase = pyrebase.initialize_app(self.config)
        self.db = self.firebase.database()

    #Finds the number of pages that return the results of the search
    def getPagesRemaining(self):
        pagesRemaining = 0
        
        try: 
            allPages = self.browser.find_elements_by_xpath("//*[@id='nav']/tbody/tr/td")
            navEnds = self.browser.find_elements_by_class_name("navend")
            currentPage = self.browser.find_element_by_class_name("cur")
            futurePage = False
            
            for page in allPages:
                if(page == currentPage):
                    futurePage = True
                    pagesRemaining = 0
                elif(futurePage == True):
                    if page not in navEnds:
                        pagesRemaining = pagesRemaining + 1

            print("pagesRemaining: " + str(pagesRemaining))
            return pagesRemaining
        except NoSuchElementException:
            print(NoSuchElementException)
            print("Only one page")
            return pagesRemaining

    #Finds the WebElement that is the next page to click
    def getNextPage(self):
        try: 
            allPages = self.browser.find_elements_by_xpath("//*[@id='nav']/tbody/tr/td")
            navEnds = self.browser.find_elements_by_class_name("navend")
            currentPage = self.browser.find_element_by_class_name("cur")
            pageAfterCurrent = False
            
            for page in allPages:
                if(page == currentPage):
                    pageAfterCurrent = True
                elif(pageAfterCurrent == True):
                    if(page not in navEnds):
                        return page.find_element_by_tag_name("a")
                    else:
                        return None
            
            return None

        except NoSuchElementException:
            print(NoSuchElementException)
            return None

    def searchGoogleModule(self, searchTerm):
        print(searchTerm)
        for url in search("ucsb"):
            print(url)
        return None

    def seleniumSearch(self, searchTerm):
        urls = []   
        pagesRemaining = 1
        
        self.browser.get("https://www.google.com/search?q=site%3Apastebin.com+" + searchTerm)
        time.sleep(2)

        while(pagesRemaining > 0):
            elementRoots = []
            nextPage = None

            ###WAIT PERIOD FOR PAGE TO LOAD###
            time.sleep(3)

            #Finds the number of pages that return the results of the search
            #pagesRemaining = self.getPagesRemaining()

            #Finds urls and adds them to a list before iterating to next page if necesary
            
            elementRoots = self.browser.find_elements_by_class_name('r')
        
            for element in elementRoots:
                href = element.find_element_by_tag_name("a").get_attribute("href")
                urls.append(href)

            nextPage = self.getNextPage()

            if(pagesRemaining > 0 and nextPage is not None):
                time.sleep(6)
                nextPage.click()

            
            pagesRemaining = self.getPagesRemaining()   
            #pagesRemaining = pagesRemaining - 1 

        #self.browser.close()
        return self.parseKeysFromURLs(urls)

    def parseKeysFromURLs(self, urls):
        pasteKeys = []

        #Finds pasteKey from url
        for resultURL in urls:
            if(resultURL != ""):
                pasteKeySplit = resultURL.split("pastebin.com/")
                if(pasteKeySplit[1] not in pasteKeys):
                    pasteKeys.append(pasteKeySplit[1])
        
        #Print and return paste keys
        print(pasteKeys)
        return pasteKeys

    def scrapingApiFromKeys(self, pasteKeys, id):
        for i in range(len(pasteKeys)):
            response = requests.get("http://scrape.pastebin.com/api_scrape_item.php?i=" + pasteKeys[i])
            #data = {"content":response.text}
            #data = response.json()
            #self.db.child("paste_search").child(id).child(pasteKeys[i]).set(data)
            #print(response.text)
            #self.db.child("test").push({"links":response.text})
            time.sleep(1)
            return response

    def search(self, keyword):
        results = []
        keys = self.seleniumSearch(keyword)
        id = hashlib.md5(keyword.encode()).hexdigest()
        #data = ""
        for i in range(len(keys)):
            data = {"link":"http://pastebin.com/" + keys[i]}
            self.db.child("paste_search").child(id).child(keys[i]).set(data)
        
        results = self.scrapingApiFromKeys(keys, id)
        return results
        
                                      
if __name__ == "__main__":
    paste = PastebinGoogle_Module()
    paste.search("ucsb")
    #paste.searchGoogleModule("ucsb")
