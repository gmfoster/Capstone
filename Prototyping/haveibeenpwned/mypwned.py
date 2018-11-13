import urllib
import urllib.request
import requests
import json

def main():
    get_pwned()

def get_pwned():
    email = input("What is the email youd like to check? ")
    url = "https://haveibeenpwned.com/api/v2/breachedaccount/" + email +"?includeUnverified=true"
    request  = requests.get(url)
    report = str(request)
    print (request.text)

if __name__ == "__main__":
    main()

