from googlesearch.googlesearch import GoogleSearch
import urllib3

searchTerm = "ucsb"
query = "site:pastebin.com " + searchTerm

response = GoogleSearch().search(query)

for r in response.results:
    print(r.title)
    print(r.getText())