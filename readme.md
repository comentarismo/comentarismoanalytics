# Comentarismo Analytics

This is the comentarismo Analytics project.


* This project expose HTTP JSON APIs
* All endpoints are open for allowing  Cross Domain requests 


# POST `/analytics` example payload:
```
{
    "browser": {"name": "Chrome", "version": "49.0.2623.112", "major": "49"},
    "os": {"name": "Mac OS", "version": "10.8.5"},
    "engine": {"version": "537.36", "name": "WebKit"},
    "language": "en",
    "date": "Sun Nov 13 2016 17:21:58 GMT+0000",
    "screen": {"screen": "1280x800", "orientation": 0},
    "mobile": false,
    "type": "view",
    "fp": "68d038b17d2b21c1289bac13222ba970",
    "operator": "bbcuk",
    "key": "ASD123"
};
```


* browser: Browser version
* os: Operational system
* engine: JS
* language: Browser Language
* date
* screen
* mobile
* type
* fp: stands for firgerprint
* operator: the operator (customer id name)
* key: the customer key that plugin is configured to use atm analytics has been generated/send



# POST `/syntax` noun, verb, adjective, adverb -> example payload: 
``
` {type: "getNouns", text: "The angry bear chased the frightened little squirrel"}`
` {type: "getVerbs", text: "The angry bear chased the frightened little squirrel"}`
` {type: "getAdjectives", text: "The angry bear chased the frightened little squirrel"}`
` {type: "getAdverbs", text: "The angry bear chased the frightened little squirrel"}`


# POST `/textinfo` dates, times, phones, links, emails, places: 
``
` {type: "dates", text: " the 28th of december."}`
` {type: "times", text: "Now is 12:54 AM, "}`
` {type: "phones", text: "My phone number is 555 555-5555"}`
` {type: "links", text: "Follow me on twitter at http://twitter.com/twitter"}`
` {type: "emails", text: "Get my email test@testdeparetment.testcorp.com"}`
` {type: "places", text: "They live at Los Angeles"}`


# POST `/twitter` extractMentions, extractHashtags, extractUrls -> example payload: 
` {type: "extractMentions", text: '#hashtag Mentioning @twitter and @jack, #baby'}`
` {type: "extractHashtags", text: '#hashtag Mentioning @twitter and @jack, #baby'}`
` {type: "extractUrls", text: '#hashtag Mentioning @twitter and @jack, #baby Message with hyphenated-url.com'}`

# POST `/retext`:

## Coverage Report
`http://localhost:3013/lcov-report/`