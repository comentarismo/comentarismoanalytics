var utils = require("../utils");

module.exports = function (app,requestIp, connection, geoip) {

    app.all('/analytics', utils.allowCrossDomain, requestIp.mw(), function (req, res) {
        console.log('analytics called ...', req.body.track);
        if (req.method === 'PUT' ||
            req.method === 'GET' ||
            req.method === 'DELETE' ||
            req.method === 'HEAD' ||
            req.method === 'TRACE' ||
            req.method === 'CONNECT') {
            console.log("Could not process METHOD:(", req.method);
            return res.status(422).send({error: "invalid_method"});
        }

        var t = req.body.track;
        if (!t) {
            console.log("Could not identify message :(", req.body);
            return res.status(422).send({error: "invalid_message"});
        }
        var track = t;

        var ip = req.clientIp;
        if (ip) {
            track.ip = ip;
        } else {
            console.log("Error: Could not identify IP!! ")
        }

        console.log(track);

        //if is message type view
        if (track.type === "view") {
            track.date = new Date();
            //get geoip identification and enhance message with + info

            persistView(track, function (err) {
                if (err) {
                    console.log("Error: persistView, ", err);
                    return res.send({error: "Could not process view"});
                } else {
                    console.log("Done processing job :D ");
                    return res.send({track: "ok"});
                }

            });

        } else {
            console.log("Could not identify message type :(", track);
            return res.status(422).send({error: "invalid_type"});
        }

    });

    function persistView(view, cb) {
        var geo = geoip.lookup(view.ip);
        if (geo) {
            view.geo = geo;
        }

        connection.table('analytics').insert(view, {
            returnChanges: false,
            conflict: "replace"
        }).run().then(function (dbres) {
            cb();
        }).catch(function (e) {
            console.log("ERROR: ", e);
            cb(e);
        });

    }


}