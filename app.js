//This is the REST API for the analytics+ module

//In here we will be exposing a series of http endpoints to be used further by all our components that need to log metrics
//ex is the comentarismo-js plugin that need to inform us about the visit, browser and ip address of someone who just visited one of our links, and goes on.

//apis are limiting access for IPs by default to all endpoints
const requestIp = require('request-ip');
const redis = require("redis");
const geoip = require('geoip-lite');

const r = require('rethinkdbdash');
const utils = require("./utils");

const logger = require('./server/logger_middleware/server').logger


const DEBUG_MODE_ON = process.env.DEBUG || false;

const RETHINKDB_DB = process.env.RETHINKDB_DB || 'test';
const RETHINKDB_HOST = process.env.RETHINKDB_HOST || 'g7-box';
const RETHINKDB_PORT = process.env.RETHINKDB_PORT || 28015;
const RETHINKDB_PASSWORD = process.env.RETHINKDB_PASSWORD;

const RETHINKDB_TIMEOUT = process.env.RETHINKDB_TIMEOUT || 120;

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";
const EXPIRE_REDIS = process.env.EXPIRE_REDIS;

logger.info(`REDIS_HOST -> ${REDIS_HOST}, REDIS_PORT -> ${REDIS_PORT}, REDIS_PASSWORD -> ${REDIS_PASSWORD}, EXPIRE_REDIS -> ${EXPIRE_REDIS}`);

const port = process.env.PORT || 3013;

const express = require('express'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    basicAuth = require('basic-auth-connect');

const app = express();

app.use(compress());
app.use(bodyParser());

// app.use(basicAuth('admin', 'g4'));


const connection = r({
    db: RETHINKDB_DB,
    timeout: RETHINKDB_TIMEOUT,
    servers: [
        {
            host: RETHINKDB_HOST,
            port: RETHINKDB_PORT,
            password: RETHINKDB_PASSWORD
        }
    ]
});

require('./server/routes')(app);
require('./server/analytics')(app, requestIp, connection, geoip);


const client = redis.createClient({
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
    logger.error("Error: ", err);
});

const RateLimit = require('./express-rate-limit');
const RedisStore = require('./redis-store');

const expireLimit = process.env.EXPIRE_LIMIT || 60;
const maxLimit = process.env.MAX_LIMIT || 20;
const delayLimit = process.env.DELAY_LIMIT || 0;

const limiter = new RateLimit({
    store: new RedisStore({
        client: client,
        expiry: expireLimit
    }),
    max: maxLimit, // limit each IP to 100 requests per windowMs
    delayMs: delayLimit, // disable delaying - full speed until the max limit is reached
    handler: limiterhandler
});



const url = require("url");
const path = require('path');

var limithtml = "";
const fs = require('fs');
fs.readFile(path.join(__dirname, 'public/404.html'), function (err, html) {
    if (!err) {
        limithtml = html;
    } else {
        logger.error("Could not open html for 404 err :(")
    }
});

function limiterhandler(req, res) {
    const pathname = url.parse(req.url).pathname;
    const ip = req.clientIp;
    logger.error("Too many requests -> ", ip);

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
logger.info('Express app started on port ' + port);
