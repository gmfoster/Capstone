import urllib
import urllib.request
import requests
import json
#import time

def main():
    get_pwned("grahammfoster96@gmail.com")

def get_pwned(email):
    #email = input("What is the email youd like to check? ")
    pwned_url = "https://haveibeenpwned.com/api/v2/breachedaccount/" + email +"?includeUnverified=true"
    paste_url = "https://haveibeenpwned.com/api/v2/pasteaccount/" + email +"?includeUnverified=true"

    request  = requests.get(pwned_url)
    #print ("Pwnage")
    return (request.json())
    #print (request.text)
    #time.sleep(1.3)
    #request = requests.get(paste_url)
    #print ("Pasteage")
    #print (request.text)
    #text += request.text

    #return (text)

if __name__ == "__main__":
    main()

