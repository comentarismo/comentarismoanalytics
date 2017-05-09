//This is the REST API for the sync module

//In here we will be exposing a series of http endpoints to be used further by all our components that need to log metrics
//ex is the comentarismo-js plugin that need to inform us about the visit, browser and ip address of someone who just visited one of our links, and goes on.

//apis are limiting access for IPs by default to all endpoints
var requestIp = require('request-ip');
var redis = require("redis");
var geoip = require('geoip-lite');

var r = require('rethinkdbdash');
var utils = require("./utils");

var DEBUG_MODE_ON = process.env.DEBUG || false;

var RETHINKDB_DB = process.env.RETHINKDB_DB || 'test';
var RETHINKDB_HOST = process.env.RETHINKDB_HOST || 'g7-box';
var RETHINKDB_PORT = process.env.RETHINKDB_PORT || 28015;
var RETHINKDB_KEY = process.env.RETHINKDB_KEY || '';

var RETHINKDB_TIMEOUT = process.env.RETHINKDB_TIMEOUT || 120;

var REDIS_HOST = process.env.REDIS_HOST || "g7-box";
var REDIS_PORT = process.env.REDIS_PORT || 6379;
var REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";
var EXPIRE_REDIS = process.env.EXPIRE_REDIS;

console.log(`REDIS_HOST -> ${REDIS_HOST}, REDIS_PORT -> ${REDIS_PORT}, REDIS_PASSWORD -> ${REDIS_PASSWORD}`);

var port = process.env.PORT || 3013;

var express = require('express'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    basicAuth = require('basic-auth-connect');

var app = express();

app.use(compress());
app.use(bodyParser());

// app.use(basicAuth('admin', 'g4'));


const connection = r({
    db: RETHINKDB_DB,
    timeout: RETHINKDB_TIMEOUT,
    servers: [
        {
            host: RETHINKDB_HOST,
            port: RETHINKDB_PORT
        }
    ]
});

require('./app/routes')(app);
require('./app/analytics')(app, requestIp, connection, geoip);
require('./app/syntax')(app, requestIp, connection);
require('./app/textinfo')(app, requestIp, connection);
require('./app/twitter')(app, requestIp, connection);
require('./app/retext')(app, requestIp, connection);


var client = redis.createClient({
    host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD,
    retry_strategy: function (options) {

        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.times_connected > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.max(options.attempt * 100, 3000);
    }
});

client.on("connect", function () {
    client.set("foo_rand000000000000", "testing redis connection", redis.print);
    client.get("foo_rand000000000000", redis.print);
});

client.on("error", function (err) {
    console.log("Error: ", err);
});

var RateLimit = require('./express-rate-limit');
var RedisStore = require('./redis-store');

var expireLimit = process.env.EXPIRE_LIMIT || 60;
var maxLimit = process.env.MAX_LIMIT || 20;
var delayLimit = process.env.DELAY_LIMIT || 0;

var limiter = new RateLimit({
    store: new RedisStore({
        client: client,
        expiry: expireLimit
    }),
    max: maxLimit, // limit each IP to 100 requests per windowMs
    delayMs: delayLimit, // disable delaying - full speed until the max limit is reached
    handler: limiterhandler
});



var url = require("url");
var path = require('path');

var limithtml = "";
var fs = require('fs');
fs.readFile(path.join(__dirname, 'public/404.html'), function (err, html) {
    if (!err) {
        limithtml = html;
    } else {
        console.log("Could not open html for 404 err :(")
    }
});

function limiterhandler(req, res) {
    var pathname = url.parse(req.url).pathname;
    var ip = req.clientIp;
    console.log("Too many requests -> ", ip);

    // save possible abuser to ratelimit table
    connection.table('ratelimit').get(ip).update(
        {
            blocks: connection.row('blocks').add(1),
            pathname: connection.branch(connection.row('pathname').default([]).contains(pathname),
                connection.row('pathname'),
                connection.row('pathname').default([]).append(pathname))
        }).run().then(function (dbresult) {
        if (dbresult.skipped > 0) {
            //nothing found, so lets insert
            connection.table('ratelimit').insert({id: ip, blocks: 0, pathname: [pathname]}, {
                returnChanges: false,
                conflict: "replace"
            }).run().then(function (dbres) {
                // console.log(dbres);
            })
        }
    });

    res.format({
        html: function () {
            res.status(429).end(limithtml);
        },
        json: function () {
            res.status(429).json({message: "Too many accounts created from this IP, please try again after an hour"});
        }
    });
}

app.use(limiter);
app.use(express.static('coverage'));
// app.use(express.static('public'));

app.use(requestIp.mw());

app.listen(port);
console.log('Express app started on port ' + port);
