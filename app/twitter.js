var utils = require("../utils");
var twitter = require('twitter-text')

module.exports = function (app, requestIp, connection) {


    //TODO: add limiter for KEY


    //find dates, times, phones, links, emails, places,
    app.all('/twitter', utils.allowCrossDomain, requestIp.mw(), function (req, res) {
        console.log('twitter called ...');
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
        if (!track.text || !track.type) {
            console.log("twitter, Could not identify message :(");
            return res.status(422).send({error: "invalid_message"});
        }

        // ================= // =================
        // ================= extractMentions
        // ================= // =================
        if (track.type === "extractMentions") {
            var mentions = twitter.extractMentions(twitter.htmlEscape(track.text));
            console.log("extractMentions -> ", mentions);
            return processResponse(mentions);
        }

        // ================= // =================
        // ================= extractHashtags
        // ================= // =================
        else if (track.type === "extractHashtags") {
            return processResponse(twitter.extractHashtags(twitter.htmlEscape(track.text)));
        }

        // ================= // =================
        // ================= extractUrls
        // ================= // =================
        else if (track.type === "extractUrls") {
            return processResponse(twitter.extractUrls(twitter.htmlEscape(track.text)));
        }

        else {
            console.log("/twitter, Could not identify message type :(", track.type);
            return res.status(422).send({error: "invalid_type"});
        }


        function processResponse(response) {
            return res.send({status: "ok", response: response});
        }

    });


}