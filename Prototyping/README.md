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

| HTTP METHOD                     | POST   | GET                  | PUT    | DELETE |
| ------------------------------- | -------| -------------------- | ------ | ------ |
| CRUD OP                         | CREATE | READ                 | UPDATE | DELETE |
| /search/Quintin-Hill            | Error  | List results on all  | Error  | Error  |
| /search/quill1316@yahoo.com     | Error  | Results from hibpwned| Error  | Error  |
| /search/quintinhill             | Error  | Results from pastebin| Error  | Error  |
<!---| /search/Paul Jordan        | Error  | Results from darkweb | Error  | Error  |--->
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
    * GET http://www.example.com/search/Quintin-Hill.json 
    * GET http://www.example.com/search/quill1316@yahoo.com.json
    * GET http://www.example.com/search/quintinhill.json

### API Resources---


  - [GET /personname](#get-personname)
  - [GET /personemail](#get-personemail)
  - [GET /personusername](#get-personusername)
  

### GET /personname

Example: http://www.example.com/search/Quintin-Hill.json

Response body:This module not implemented so not sure on this body yet


### GET /personemail

Example: http://www.example.com/search/quill1316@yahoo.com.json

Response body: 
[{"AddedDate":"2017-06-01T05:59:24Z","BreachDate":"2017-05-11","DataClasses":["Emailaddresses","Passwords","Usernames"],"Description":"In May 2017, the education platform <ahref=\"https://motherboard.vice.com/en_us/article/hacker-steals-millions-of-user-account-details-from-education-platform-edmodo\" target=\"_blank\" rel=\"noopener\">Edmodo was hacked</a> resulting in the exposure of 77 million records comprised of over 43 million unique customer email addresses. The data was consequently published to a popular hacking forum and made freely available. The records in the breach included usernames, email addresses and bcrypt hashes of passwords.","Domain":"edmodo.com","IsFabricated":false,"IsRetired":false,"IsSensitive":false,"IsSpamList":false,"IsVerified":true,"LogoType":"svg","ModifiedDate":"2017-06-01T05:59:24Z","Name":"Edmodo","PwnCount":43423561,"Title":"Edmodo"},{"AddedDate":"2016-10-12T09:09:11Z","BreachDate":"2016-10-08","DataClasses":["Dates of birth","Email addresses","Genders","IP addresses","Job titles","Names","Phone numbers","Physical addresses"],"Description":"In October 2016, a large Mongo DB file containing tens of millions of accounts <a href=\"https://twitter.com/0x2Taylor/status/784544208879292417\" target=\"_blank\" rel=\"noopener\">was shared publicly on Twitter</a> (the file has since been removed). The database contained over 58M unique email addresses along with IP addresses, names, home addresses, genders, job titles, dates of birth and phone numbers. The data was subsequently <a href=\"http://news.softpedia.com/news/hacker-steals-58-million-user-records-from-data-storage-provider-509190.shtml\" target=\"_blank\" rel=\"noopener\">attributed to &quot;Modern Business Solutions&quot;</a>, a company that provides data storage and database hosting solutions. They've yet to acknowledge the incident or explain how they came to be in possession of the data.","Domain":"modbsolutions.com","IsFabricated":false,"IsRetired":false,"IsSensitive":false,"IsSpamList":false,"IsVerified":true,"LogoType":"png","ModifiedDate":"2016-10-12T09:09:11Z","Name":"ModernBusinessSolutions","PwnCount":58843488,"Title":"Modern Business Solutions"},{"AddedDate":"2017-03-08T23:49:53Z","BreachDate":"2017-01-01","DataClasses":["Email addresses","IP addresses","Names","Physical addresses"],"Description":"In January 2017, <a href=\"https://mackeeper.com/blog/post/339-spammergate-the-fall-of-an-empire\" target=\"_blank\" rel=\"noopener\">a massive trove of data from River City Media was found exposed online</a>. The data was found to contain almost 1.4 billion records including email and IP addresses, names and physical addresses, all of which was used as part of an enormous spam operation. Once de-duplicated, there were 393 million unique email addresses within the exposed data.","Domain":"rivercitymediaonline.com","IsFabricated":false,"IsRetired":false,"IsSensitive":false,"IsSpamList":true,"IsVerified":true,"LogoType":"png","ModifiedDate":"2017-03-08T23:49:53Z","Name":"RiverCityMedia","PwnCount":393430309,"Title":"River City Media Spam List"}]

    
### GET /personusername

Example: http://www.example.com/search/quintinhill.json

Response body: This module not implemented so not sure on this body yet





