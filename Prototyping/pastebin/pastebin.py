import urllib
import urllib.request
import requests
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
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
        self.chrome_options = Options()
        #self.chrome_options.add_argument('headless')
        self.browser = webdriver.Chrome(self.driverDirectory, options = self.chrome_options)
    
    #def search(self, searchTerm):
        #header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'}
        
        #search = requests.get("http://pastebin.com/search?q="+searchTerm, headers = header)
        #print(search)
        #print(search.text)
        #print(search.json)

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

        print("Number of pages: " + str(numPages))

        while(currentPage <= numPages):
            elementRoots = []
            elementRoots = self.browser.find_elements_by_css_selector(".gs-webResult.gs-result")
            for element in elementRoots:
                try:
                    e = element.find_element_by_css_selector(".gs-bidi-start-align.gs-visibleUrl.gs-visibleUrl-long")
                    urls.append(str(e.text))
                except:
                    print("No urls because search results returned an empty page")

            print("Number of urls found on this page: " + str(len(urls)))

            for element in urls:
                print(element)

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
        


        # //*[@id="___gcse_0"]/div/div/div/div[5]/div[2]/div/div/div[2]/div[11]/div/div[1]
        # //*[@id="___gcse_0"]/div/div/div/div[5]/div[2]/div/div/div[2]/div[11]/div/div[2]
        # //*[@id="___gcse_0"]/div/div/div/div[5]/div[2]/div/div/div[2]/div[11]/div/div[3]

if __name__ == "__main__":
    paste = Pastebin_Module()
    paste.seleniumSearch("umail.ucsb.edu")
