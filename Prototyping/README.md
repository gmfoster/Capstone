# NovaSight Restful API 

* [Introduction](#introduction)
* [General guidelines](#general-guidelines)
* [HTTP Verbs](#http-verbs)
* [Error handling](#error-handling)
* [Search Examples](#search-examples)

## Introduction

This document provides guidelines and examples for 

## General guidelines

### General guidelines for NovaSight Url

## HTTP Verbs

Here's an example of how HTTP verbs map to create, read, update, delete operations in a particular context:

| HTTP METHOD                             | GET                  | 
| --------------------------------------- | -------------------- | 
| CRUD OP                                 | READ                 | 
| /analyze/Quintin-Hill                   | List results on all  | 
| /analyze/hibpwned/quill1316@yahoo.com   | Results from hibpwned|
| /analyze/pastebin/quintinhill           | Results from pastebin| 
| /analyze/DrkWeb/Quintin Hill            | Results from darkweb | 
## Error handling

Error responses should include a common HTTP status code, message for the developer, message for the end-user (when appropriate), internal error code (corresponding to some specific internally determined ID), links where developers can find more info. For example:

   
    {
      "status" : 200,
      "developerMessage" : "OK",
    }
      "status" : 201,
      "developerMessage" : "Created",
    }
    
    {
      "status" : 304,
      "developerMessage" : "Not Modified",
    }
    
    {
      "status" : 400,
      "developerMessage" : "Bad Request",
    }
    
    {
      "status" : 401,
      "developerMessage" : "Not Authorized",
    }
 
    {
      "status" : 404,
      "developerMessage" : "Not Found",
    }
    
    {
      "status" : 409,
      "developerMessage" : "Conflict",
    }
    
    {
      "status" : 500,
      "developerMessage" : "Internal Server Error",
    }

## Search Examples

* List of requests:
    * GET http://www.example.com/analyze/hibpwned/Quintin-Hill.json 
    * GET http://www.example.com/analyze/pastebin/quill1316@yahoo.com.json
    * GET http://www.example.com/analyze/darkweb/quintinhill.json

### API Resources---


  - [GET /hibpwned](#get-hibpwned)
  - [GET /pastebin](#get-pastebin)
  - [GET /darkweb](#get-darkweb)
  

### GET /hibpwned

Example: http://www.example.com/analyze/quill1316@yahoo.com.json

[
{
"Name":"Adobe",
"Title":"Adobe",
"Domain":"adobe.com",
"BreachDate":"2013-10-04",
"AddedDate":"2013-12-04T00:00Z",
"ModifiedDate":"2013-12-04T00:00Z",
"PwnCount":152445165,
"Description":"In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, <em>encrypted</em> password and a password hint in plain text. The password cryptography was poorly done and <a href=\"http://stricture-group.com/files/adobe-top100.txt\" target=\"_blank\" rel=\"noopener\">many were quickly resolved back to plain text</a>. The unencrypted hints also <a href=\"http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html\" target=\"_blank\" rel=\"noopener\">disclosed much about the passwords</a> adding further to the risk that hundreds of millions of Adobe customers already faced.",
"DataClasses":["Email addresses","Password hints","Passwords","Usernames"],
"IsVerified":True,
"IsSensitive":False,
"IsRetired":False,
"IsSpamList":False
},
{
"Name":"BattlefieldHeroes",

"Title":"Battlefield Heroes",

"Domain":"battlefieldheroes.com",

"BreachDate":"2011-06-26",

"AddedDate":"2014-01-23T13:10Z",

"ModifiedDate":"2014-01-23T13:10Z",'

"PwnCount":530270,

"Description":"In June 2011 as part of a final breached data dump, the hacker collective &quot;LulzSec&quot; <a href=\"http://www.rockpapershotgun.com/2011/06/26/lulzsec-over-release-battlefield-heroes-data\" target=\"_blank\" rel=\"noopener\">obtained and released over half a million usernames and passwords from the game Battlefield Heroes</a>. The passwords were stored as MD5 hashes with no salt and many were easily converted back to their plain text versions.",
"DataClasses":["Passwords","Usernames"],
"IsVerified":True,
"IsSensitive":False,
"IsRetired":False,
"IsSpamList":False
}
]

### GET /pastebin

Example: http://www.example.com/analyze/Quintin-password.json

Response body: 
[
    {
        "scrape_url": "https://scrape.pastebin.com/api_scrape_item.php?i=0CeaNm8Y",
        "full_url": "https://pastebin.com/0CeaNm8Y",
        "date": "1442911802",
        "key": "0CeaNm8Y",
        "size": "890",
        "expire": "1442998159",
        "title": "Once we all know when we goto function",
        "syntax": "java",
        "user": "admin"
    },
	{
        "scrape_url": "https://scrape.pastebin.com/api_scrape_item.php?i=8sUIsf34",
        "full_url": "https://pastebin.com/8sUIsf34",
        "date": "1442911665",
        "key": "8sUIsf34",
        "size": "250",
        "expire": "0",
        "title": "master / development delete restriction",
        "syntax": "php",
        "user": ""
    }
]
    
### GET /darkweb

Example: http://www.example.com/analyze/quintinhill.json

Response body: This module not implemented so not sure on this body yet





