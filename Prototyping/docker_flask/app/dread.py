from tbselenium.tbdriver import TorBrowserDriver
import tbselenium.common as cm
from tbselenium.utils import launch_tbb_tor_with_stem
from tbselenium.utils import start_xvfb, stop_xvfb
from pyvirtualdisplay import Display
from time import sleep
from PIL import Image
import pyrebase
import hashlib
import os

#key for dread: howogoduqidobupinadurediwebupatufocetowe

CAPTCHA_PAGE = 1

class Dread_Module():
    def __init__(self):
        self.search_url = 'http://dreadditevelidot.onion/search/'
        #self.tbb_dir = '/home/graham/Desktop/Capstone/Prototyping/docker_flask/app/tor-browser/'
        self.script_dir = os.path.dirname(os.path.abspath(__file__))
        self.rel_path = '/tor-browser/'
        self.tbb_dir = self.script_dir + self.rel_path        
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

    def WhichIsCurrentPage(self, driver):    
        #On Initial Capthca Page
        try: 
            driver.find_element_by_class_name("ddos_form")
            return CAPTCHA_PAGE
        except:
            pass

    def solveCaptchaPage(self, driver):
        print ("Solving Captcha Page")

        try:
            
            currentPage = driver.find_element_by_tag_name('html');
            
            driver.find_elements_by_tag_name("img")[0].get_attribute("src")   
            driver.get_screenshot_as_file('captcha.png')
            
            img = Image.open('captcha.png')
            img.show() 
            captcha = input("Solve Captcha:")
            

            driver.find_element_by_name('ddos_challenge').send_keys(captcha);
            #driver.find_element_by_name('verify').click()
            #driver.find_element_by_xpath("//input[@type='submit']").click()
            driver.find_element_by_xpath("//button[@type='submit']").click()
            self.waitTillPageIsLoaded(currentPage,driver)
            
        except Exception as e:
            print ("Exception on Second Page:",e)
            pass


        
    #Because for some dumb reason driver won't wait until new page is loaded after click.
    def waitTillPageIsLoaded(self,currentPage,driver):
            newPage = currentPage

            while (currentPage == newPage):
                sleep(1)
                #Wait...
                try:
                    newPage = driver.find_element_by_tag_name('html');
                except:
                    pass
                #print "NEW",newPage
            sleep(2)

    def run(self, queries, wait_time=0):
 #       xvfb_display = start_xvfb()
        resultCount = 0
        results = []


        tor_process = launch_tbb_tor_with_stem(tbb_path=self.tbb_dir)
        with TorBrowserDriver(self.tbb_dir, tor_cfg=cm.USE_STEM) as driver:
        
            driver.load_url(self.search_url)

            if (self.WhichIsCurrentPage(driver) == CAPTCHA_PAGE):
                self.solveCaptchaPage(driver)

            for q in queries:
                nextPage = True
                currentPage = driver.find_element_by_tag_name('html')

                searchform = driver.find_element_by_class_name('inner')
                searchform.find_element_by_name('q').send_keys(q)
                searchform.find_element_by_class_name('standardBtn').click()

                self.waitTillPageIsLoaded(currentPage,driver)

                id = hashlib.md5(q.encode()).hexdigest()
                postNum = 0
            
                while (nextPage == True):
                    postBoard = driver.find_element_by_class_name("postBoard")
                    items = postBoard.find_elements_by_class_name("item")
                    comments = postBoard.find_elements_by_class_name("item.comment")
                    resultCount += len(comments)
                    for c in comments:
                        items.remove(c)
                    for l in items:
                        header = l.find_element_by_class_name("postTop")
                        links = header.find_element_by_css_selector("a[href]")
                        url = links.get_attribute('href')
                        text = links.get_attribute('text')
                        data = {"title": text, "link":url}
                        self.db.child("dark_search").child(id).child(postNum).set(data)
                        postNum += 1
                    for c in comments:
                        body = c.find_element_by_class_name("cont")
                        title = body.find_element_by_class_name("post-title")
                        links = title.find_element_by_css_selector("a[href]")
                        url = links.get_attribute('href')
                        text = links.get_attribute('text')
                        data = {"title": text, "link": url}
                        self.db.child("dark_search").child(id).child(postNum).set(data)
                        postNum += 1
                    try:
                        pages = driver.find_element_by_class_name("pagination")
                        pages.find_element_by_class_name("next").click()
                        sleep(10)
                    except:
                        nextPage = False


                sleep(10)


#        stop_xvfb(xvfb_display)
        tor_process.kill()
        print(resultCount)
        return resultCount

if __name__ == '__main__':
    print("searching Dread")
    ds = Dread_Module()
    queries = ['credit card dump']
    dread_results = ds.run(queries=queries, wait_time=0)


