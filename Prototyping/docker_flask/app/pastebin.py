import datetime
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
import traceback

class Pastebin_Module():
    def __init__(self):
        #initialize something
        #print("This is a " + platform + "machine.")
        dirPath = os.path.dirname(os.path.realpath(__file__))
        self.moduleName = "Pastebin"
        if platform == "linux" or platform == "linux2":
            if("wsl" in argv):
                #print("Took wsl branch")
                subDir = "windows/chromedriver.exe"
            else:
                subDir = "linux/chromedriver"
        elif platform == "darwin":
            subDir = "mac/chromedriver"
        elif platform == "win32":
            subDir = "windows/chromedriver.exe"
        self.driverDirectory = dirPath + "/chromedriver/" + subDir
        #print(self.driverDirectory)
        self.chrome_options = Options()
        #self.chrome_options.add_argument('headless')
        #self.chrome_options.add_argument('--disable-gpu')
        #self.chrome_options.add_argument('window-size=0,0')
        self.browser = webdriver.Chrome(self.driverDirectory, options = self.chrome_options)
        self.browser.minimize_window()
    
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

            #print("pagesRemaining: " + str(pagesRemaining))
            return pagesRemaining
        except NoSuchElementException:
            #print(NoSuchElementException)
            #print("Only one page")
            return 1

    #Finds the WebElement that is the next page to click
    def getNextPage(self):
        currentPageNumber = 1
        try:
            currentPageNumber = 1
            pageSelector = self.browser.find_element_by_class_name("gsc-cursor")
            pagesElementsArray = pageSelector.find_elements_by_css_selector("*")
            currentPage = self.browser.find_element_by_class_name("gsc-cursor-current-page")
            pageAfterCurrent = False
            
            
            for page in pagesElementsArray:
                if(page == currentPage):
                    pageAfterCurrent = True
                elif(pageAfterCurrent == True):
                    return page
                currentPageNumber = currentPageNumber + 1

        except NoSuchElementException:
            #print("currentPageNumber: " + str(currentPageNumber))
            #print(NoSuchElementException)
            return None

    def seleniumSearch(self, searchTerm):
        pasteKeys = []
        urls = []
        times = []
        previews = []

        self.browser.get("https://www.pastebin.com/search?q="+searchTerm)

        ###WAIT PERIOD FOR PAGE TO LOAD###
        time.sleep(2)

        #Finds the number of pages that return the results of the search
        pagesRemaining = self.getPagesRemaining()
        #print("PagesRemainingTop: " + str(pagesRemaining))

        #Finds urls and adds them to a list before iterating to next page if necesary
        while(pagesRemaining > 0):
            time.sleep(2)
            #elementRoots = self.browser.find_elements_by_class_name("gs-visible-long")
            
            #urlElements = self.browser.find_elements_by_class_name("gs-result")
         

            # for element in elementRoots:
            #     try:
            #         e = element.find_element_by_class_name("gs-visibleUrl-long")
            #         print(e.text)
            #         urls.append(str(e.text))
            try: 
                elementRoots = self.browser.find_elements_by_class_name("gs-visibleUrl-long")
                time.sleep(3)
                for element in elementRoots:
                    #print(element.text)
                    urls.append(str(element.text))
            except StaleElementReferenceException:
                print("No urls because search results returned a stale page")
            except NoSuchElementException:
                print("No such element exception")

            #Find the next page
            nextPage = self.getNextPage()

            if(pagesRemaining > 1):
                try:
                    nextPage.click()
                except:
                    print("Stale link/pastebin error/end of pages")
            #getValue = self.getPagesRemaining()
            #print(getValue)
            pagesRemaining = pagesRemaining - 1

        self.browser.close()

        #Finds pasteKey from url
        for resultURL in urls:
            if(resultURL != ""):
                pasteKeySplit = resultURL.split("pastebin.com/")
                if(pasteKeySplit[1] not in pasteKeys):
                    pasteKeys.append(pasteKeySplit[1])
                    timePosted, preview = self.scrapingApiFromKeys(pasteKeySplit[1], searchTerm)
                    times.append(timePosted)
                    previews.append(preview)

        
        #Print and return paste keys
        #print(pasteKeys)
        return pasteKeys, times, previews

    def scrapingApiFromKeys(self, pasteKey, keyword):
        timePosted = "0"
        preview = "No Preview Avaliable"
        keyword = keyword.strip()
        #print(pasteKey)
        try:
            response = requests.get("http://scrape.pastebin.com/api_scrape_item_meta.php?i=" + pasteKey)
            json_response = response.json()
            timePosted = json_response[0]['date']
        except Exception as e:
            print("Exception1: ",e)
            pass
        try:
            searchTerm = ""
            responseScrape = requests.get("https://scrape.pastebin.com/api_scrape_item.php?i=" + pasteKey)
            searchTerms = keyword.split(" ")
            print("checkpoint1")
            print(searchTerms)
            found = False
            for term in searchTerms:
                if(term in responseScrape.text): 
                    if(not found):
                        print("checkpoint1.01")
                        searchTerm = term
                        found = True
            stringRequestResponse = responseScrape.text.replace("\n", " ").replace("\t", " ")
            if(found):
                print("checkpoint 1.1")
                stringResponse = stringRequestResponse.split(searchTerm)
                print("checkpoint1.2")
                stringResponseBefore = stringResponse[0]
                print("checkpoint2")
                stringResponseAfter = stringResponse[1]
                print("checkpoint3")
                wordsBefore = stringResponseBefore.split(" ")
                wordsAfter = stringResponseAfter.split(" ")
                if(len(wordsBefore) < 10):
                    startIndex = 0
                else:
                    startIndex = len(wordsBefore) - 10
                if(len(wordsAfter) < 10):
                    endIndex = len(wordsAfter) - 1
                else: 
                    endIndex = 9
                print("checkpoint4")
                for i in wordsBefore[startIndex:]:
                    if(i):
                        preview = preview + " " + i.strip()
                print("checkpoint5")
                preview = preview + searchTerm
                for i in wordsAfter[:endIndex]:
                    if(i):
                        preview = preview + " " + i.lstrip().rstrip()
                print("checkpoint6")
                #preview = preview.lstrip()
            else:
                print("checkpointFound1")
                splitPreview = stringRequestResponse.split(" ")
                if(len(splitPreview) > 20):
                    print("checkpointFound2")
                    for word in splitPreview[:20]:
                        preview = preview + word
                else:
                    print("checkpointFound3")
                    if(len(splitPreview) != 0):
                        print("checkpointFound4")
                        for word in splitPreview:
                            preview = preview + word
                    else:
                        print("checkpointFound5")
                        #should never get executed
                        preview = "No Preview Available"

        except Exception as e:
            print("Exception2: ",e)
            pass

        #print("Key: " + str(pasteKey))
        #print("Time: " + timePosted)
        #print("Preview: " + preview)

        time.sleep(1)
        return timePosted, preview

    def search(self, keyword):
        results = []
        keys, timePosted, preview = self.seleniumSearch(keyword)
        id = hashlib.md5(keyword.encode()).hexdigest()
        currentDT = datetime.datetime.now()
        currentTime = currentDT.strftime("%d:%I:%M:%S")
        #data = ""
        for i in range(len(keys)):
            data = {"link":"http://pastebin.com/" + keys[i], "time discovered(day:hour:minute:second)":currentTime, "time posted":timePosted[i], "preview":preview[i]}
            self.db.child("paste_search").child(id).child(keys[i]).set(data)
        
        #results = self.scrapingApiFromKeys(keys, id)
        return len(keys)

    def close(self):
        self.browser.close()
                                      
if __name__ == "__main__" and "test" in argv:
    paste = Pastebin_Module()
    paste.search("ucsb blake")
