from rfapi import ConnectApiClient
import hashlib
import json

class Darkweb_Module():
    def __init__(self):
        self.api = ConnectApiClient(auth='85c7bffbcab1471d8e416f0477e230cf')

        
    def search(self):
        query_response = self.api.query({
                "references": {
                    "type": "CyberAttack",
                    "limit": 20
                    }
                })

        print(json.dumps(query_response.result, indent=2))

if __name__ == "__main__":
    web = Darkweb_Module()
    web.search()
