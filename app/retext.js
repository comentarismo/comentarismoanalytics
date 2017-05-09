var utils = require("../utils");
var retext = require('retext');
var equality = require('retext-equality');
var simplify = require('retext-simplify');
var reporter = require('./vfile-reporter-json');

module.exports = function (app, requestIp, connection) {

    //TODO: add limiter for KEY
    const endpoint = '/retext/:type';
    app.all(endpoint, utils.allowCrossDomain, requestIp.mw(), function (req, res) {
        if (req.method === 'PUT' ||
            req.method === 'GET' ||
            req.method === 'DELETE' ||
            req.method === 'HEAD' ||
            req.method === 'TRACE' ||
            req.method === 'CONNECT') {
            console.log("syntax, Could not process METHOD :(", req.method, endpoint);
            return res.status(422).send({error: "invalid_method"});
        }

        var track = req.body;
        var type = req.params.type;

        if (!track.text || !type) {
            console.log("syntax, Could not identify message, type -> ", type, track, endpoint);
            return res.status(422).send({error: "invalid_message"});
        }
        console.log('syntax called ...' + type, endpoint);

        type = type.toLowerCase();

        // ======= POST ======= simplefy, equalify //
        const r = retext();

        // ================= // =================
        // ================= simplify
        // ================= // =================
        if (type === "simplify") {
            return r.use(simplify)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= equality
        // ================= // =================
        else if (type === "equality") {
            return r.use(equality)
                .process(track.text, processResponse)
        }


        else {
            console.log("Could not identify message type :(", track.type, endpoint);
            return res.status(422).send({error: "invalid_type"});
        }


        function processResponse(err, response) {
            var rep;
            if (err) {
                rep = reporter(err);
                return res.error(rep);
            } else {
                delete response.cwd;
                rep = reporter(response);
                return res.send(rep);
            }
        }

    });


};