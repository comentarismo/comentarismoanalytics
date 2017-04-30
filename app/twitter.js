var utils = require("../utils");
var twitter = require('twitter-text')

module.exports = function (app, requestIp, connection) {


    //TODO: add limiter for KEY


    //find dates, times, phones, links, emails, places,
    app.all('/twitter/:type', utils.allowCrossDomain, requestIp.mw(), function (req, res) {
        if (req.method === 'PUT' ||
            req.method === 'GET' ||
            req.method === 'DELETE' ||
            req.method === 'HEAD' ||
            req.method === 'TRACE' ||
            req.method === 'CONNECT') {
            console.log("twitter, Could not process METHOD :(", req.method);
            return res.status(422).send({error: "invalid_method"});
        }

        var track = req.body;
        var type = req.params.type;

        if (!track.text || !type) {
            console.log("syntax, Could not identify message, type -> ", type, track);
            return res.status(422).send({error: "invalid_message"});
        }
        console.log('twitter called ...' + type);

        type = type.toLowerCase();

        // ================= // =================
        // ================= extractMentions
        // ================= // =================
        if (type === "extractmentions") {
            var mentions = twitter.extractMentions(twitter.htmlEscape(track.text));
            console.log("extractMentions -> ", mentions);
            return processResponse(mentions);
        }

        // ================= // =================
        // ================= extractHashtags
        // ================= // =================
        else if (type === "extracthashtags") {
            return processResponse(twitter.extractHashtags(twitter.htmlEscape(track.text)));
        }

        // ================= // =================
        // ================= extractUrls
        // ================= // =================
        else if (type === "extracturls") {
            return processResponse(twitter.extractUrls(twitter.htmlEscape(track.text)));
        }

        else {
            console.log("/twitter, Could not identify message type :(", type);
            return res.status(422).send({error: "invalid_type"});
        }


        function processResponse(response) {
            return res.send(response);
        }

    });


}