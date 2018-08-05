const utils = require("../utils");

const logger = require('./logger_middleware/server').logger

var errMsg = 'Error: '
module.exports = function (app, requestIp, RETHINKDB_CONNECTION, geoip) {

    app.all('/analytics', utils.allowCrossDomain, requestIp.mw(), function (req, res) {
        logger.log('analytics called ...', req.body.track);
        if (req.method === 'PUT' ||
            req.method === 'GET' ||
            req.method === 'DELETE' ||
            req.method === 'HEAD' ||
            req.method === 'TRACE' ||
            req.method === 'CONNECT') {
            logger.log("Could not process METHOD:(", req.method);
            return res.status(422).send({error: "invalid_method"});
        }

        const t = req.body.track;
        if (!t) {
            logger.log("Could not identify message :(", req.body);
            return res.status(422).send({error: "invalid_message"});
        }
        const track = t;

        const ip = req.clientIp;
        if (ip) {
            track.ip = ip;
        } else {
            logger.log("Error: Could not identify IP!! ")
        }

        logger.log(track);

        //if is message type view
        if (track.type === "view") {
            track.date = new Date();
            //get geoip identification and enhance message with + info

            persistView(track, function (err) {
                if (err) {
                    logger.log("Error: persistView, ", err);
                    return res.send({error: "Could not process view"});
                } else {
                    logger.log("Done processing job :D ");
                    return res.send({track: "ok"});
                }

            });

        } else {
            logger.log("Could not identify message type :(", track);
            return res.status(422).send({error: "invalid_type"});
        }

    });


    app.all('/getviews', utils.allowCrossDomain, requestIp.mw(), function (req, res) {

        var table = "analytics";
        var index = req.params.index || "operator";
        var value = req.params.value || "theguardian";
        var range = parseInt(req.params.range);
        if (!range) {
            //default 6 months
            range = 6
        }

        var urlTag = `/getviews?table=${table}&index=${index}&value=${value}?range=${range}`;

        logger.debug(urlTag);

        getAllByDateRangeIndexOrderByFilterSkipLimit(table, index, value, range, RETHINKDB_CONNECTION, function (err, data) {
            if (err) {
                logger.error(
                    'getAllByDateRangeIndexOrderByFilterSkipLimit -> ',
                    err.stack)
                return res.status(500).send('Something broke!')
            }

            if (data) {
                //-------REDIS CACHE SAVE START ------//
                logger.debug(urlTag + ' will save cached')
                res.type('application/json')
                // if (!DISABLE_CACHE) {
                // REDIS_CONNECTION.set(urlTag,
                //     JSON.stringify(data), 'EX',
                //     EXPIRE_REDIS)
                // }
                //-------REDIS CACHE SAVE END ------//
            }
            res.send(data)
        })

    });

    function getAllByDateRangeIndexOrderByFilterSkipLimit(table, index, value, range, conn, cb) {
        if (!table || !index || !value) {
            logger.warn(errMsg + 'table --> ' + table + ' index -> ' + index +
                ' value --> ' + value)
            logger.warn(errMsg +
                'getAllByDateRangeIndexOrderByFilterSkipLimit --> search query is not correct.')
            return cb()
        }

        if (!range) {
            range = 10
        }

        var date = new Date()
        var dateObj = new Date(
            date.getFullYear(),
            date.getMonth() - range,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds(),
        )

        var month = dateObj.getUTCMonth() + 1 //months from 1-12
        var day = dateObj.getUTCDate()
        var year = dateObj.getUTCFullYear()

        var indexname = index + '_' + 'date'

        var query = conn.table(table, {readMode: 'outdated'}).between([value, conn.time(year, month, day, '+00:00')],
            [value, conn.maxval], {index: indexname}).count()

        logger.debug('getAllByDateRangeIndexOrderByFilterSkipLimit, ', query)

        query.run().then(function (results) {
            if (!results) {
                logger.info(
                    'Error: getAllByDateRangeIndexOrderByFilterSkipLimit could not find anyting  -> ',
                    query)
                cb(null, {count: 0})
            } else {
                logger.debug('getAllByDateRangeIndexOrderByFilterSkipLimit', results)
                cb(null, {count: results})
            }
            return results
        }).catch(function (err) {
            logger.error('Error: getAllByDateRangeIndexOrderByFilterSkipLimit, ',
                err)
            cb(err)
        })
    }


    function persistView(view, cb) {
        const geo = geoip.lookup(view.ip);
        if (geo) {
            view.geo = geo;
        }

        RETHINKDB_CONNECTION.table('analytics').insert(view, {
            returnChanges: false,
            conflict: "replace"
        }).run().then(function (dbres) {
            cb();
        }).catch(function (e) {
            logger.log("ERROR: ", e);
            cb(e);
        });

    }


}