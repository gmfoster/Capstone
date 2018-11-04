# NovaSight Restful API 

* [Introduction](#introduction)
* [General guidelines](#general-guidelines)
* [HTTP Verbs](#http-verbs)
* [Error handling](#error-handling)
* [Versions](#versions)
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
| /search/Bill_Gates              | Error  | List results on all  | Error  | Error  |
| /search/Bill_Gates/?module_pb=1 | Error  | Results from pastebin| Error  | Error  |
| /search/Bill_Gates/?module_pwn=1| Error  | Results from hibpwned| Error  | Error  |
| /search/Bill_Gates/?module_dw=1 | Error  | Results from darkweb | Error  | Error  |

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

## Versions

* v1

## Search Examples

* List of requests:
    * GET http://www.example.com/v1/search/Bill_Gates.json
* Filtering is a query:
    * GET http://www.example.com/v1/search/Bill_Gates.json?module_pwn=1&module_pb=1
    * GET http://www.example.com/v1/search/Bill_Gates.json?moduke_dw=1

### API Resources--- to be edited


  - [GET /personname](#get-personname)
  - [GET /personname/[dark]](#get-magazinesid)
  - [POST /magazines/[id]/articles](#post-magazinesidarticles)

### GET /personname

Example: http://example.gov/api/v1/magazines.json

Response body:

    {
        "metadata": {
            "resultset": {
                "count": 123,
                "offset": 0,
                "limit": 10
            }
        },
        "results": [
            {
                "id": "1234",
                "type": "magazine",
                "title": "Public Water Systems",
                "tags": [
                    {"id": "125", "name": "Environment"},
                    {"id": "834", "name": "Water Quality"}
                ],
                "created": "1231621302"
            },
            {
                "id": 2351,
                "type": "magazine",
                "title": "Public Schools",
                "tags": [
                    {"id": "125", "name": "Elementary"},
                    {"id": "834", "name": "Charter Schools"}
                ],
                "created": "126251302"
            }
            {
                "id": 2351,
                "type": "magazine",
                "title": "Public Schools",
                "tags": [
                    {"id": "125", "name": "Pre-school"},
                ],
                "created": "126251302"
            }
        ]
    }

### GET /personname/[module]

Example: http://example.gov/api/v1/search/personname/[id].json

Response body:

    {
        "id": "1234",
        "type": "",
        "title": "Public Water Systems",
        "tags": [
            {"id": "125", "name": "Environment"},
            {"id": "834", "name": "Water Quality"}
        ],
        "created": "1231621302"
    }



### POST /magazines/[id]/articles

Example: Create – POST  http://example.gov/api/v1/magazines/[id]/articles

Request body:

    [
        {
            "title": "Raising Revenue",
            "author_first_name": "Jane",
            "author_last_name": "Smith",
            "author_email": "jane.smith@example.gov",
            "year": "2012",
            "month": "August",
            "day": "18",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ante ut augue scelerisque ornare. Aliquam tempus rhoncus quam vel luctus. Sed scelerisque fermentum fringilla. Suspendisse tincidunt nisl a metus feugiat vitae vestibulum enim vulputate. Quisque vehicula dictum elit, vitae cursus libero auctor sed. Vestibulum fermentum elementum nunc. Proin aliquam erat in turpis vehicula sit amet tristique lorem blandit. Nam augue est, bibendum et ultrices non, interdum in est. Quisque gravida orci lobortis... "
        }
    ]

