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
        try: 
            pageSelector = self.browser.find_element_by_class_name("gsc-cursor")
            pagesElementsArray = pageSelector.find_elements_by_css_selector("*")
            currentPage = pageSelector.find_element_by_class_name("gsc-cursor-current-page")

            futurePage = False
            pagesRemaining = 0
            for page in pagesElementsArray:
                if(page == currentPage):
                    futurePage = True
                    pagesRemaining = 1
                elif(futurePage == True):
                    pagesRemaining = pagesRemaining + 1

            print("pagesRemaining: " + str(pagesRemaining))
            return pagesRemaining
        except NoSuchElementException:
            print(NoSuchElementException)
            print("Only one page")
            return 1

    #Finds the WebElement that is the next page to click
    def getNextPage(self):
        try: 
            pageSelector = self.browser.find_element_by_class_name("gsc-cursor")
            pagesElementsArray = pageSelector.find_elements_by_css_selector("*")
            currentPage = pageSelector.find_element_by_class_name("gsc-cursor-current-page")
            pageAfterCurrent = False
            
            for page in pagesElementsArray:
                if(page == currentPage):
                    pageAfterCurrent = True
                elif(pageAfterCurrent == True):
                    return page

        except NoSuchElementException:
            print(NoSuchElementException)
            return None

    def seleniumSearch(self, searchTerm):
        pasteKeys = []
        urls = []   

        self.browser.get("https://www.pastebin.com/search?q="+searchTerm)

        ###WAIT PERIOD FOR PAGE TO LOAD###
        #time.sleep(5)

        #Finds the number of pages that return the results of the search
        pagesRemaining = self.getPagesRemaining()
        print("PagesRemainingTop: " + str(pagesRemaining))

        #Finds urls and adds them to a list before iterating to next page if necesary
        while(pagesRemaining > 0):
            elementRoots = []
            elementRoots = self.browser.find_elements_by_css_selector(".gs-webResult.gs-result")
         
            #Find the next page
            nextPage = self.getNextPage()

            for element in elementRoots:
                try:
                    e = element.find_element_by_css_selector(".gs-bidi-start-align.gs-visibleUrl.gs-visibleUrl-long")
                    urls.append(str(e.text))
                except StaleElementReferenceException:
                   print("No urls because search results returned a stale page")


            if(pagesRemaining > 1):
                try:
                    nextPage.click()
                except:
                    print("Stale link/pastebin error")
            getValue = self.getPagesRemaining()
            expectedValue = pagesRemaining - 1

            print("getValue = " + str(getValue))
            print("expectedValue = " + str(expectedValue))

            if(getValue != expectedValue):
                print("pastebin was terribly implemented and cannot count how many pages of results there are.")

            pagesRemaining = pagesRemaining - 1

        self.browser.close()

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
    paste = Pastebin_Module()
    paste.search("ucsb")