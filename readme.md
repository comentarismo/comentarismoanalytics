# Comentarismo Analytics

This is the comentarismo Analytics project.
This project expose HTTP JSON API on /analytics
This endpoint is open for allowing  Cross Domain requests and will accept a payload like the following:
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



## Coverage Report
`http://localhost:3013/lcov-report/`