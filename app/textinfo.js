var utils = require("../utils");
var Knwl = require("knwl.js");
var twitter = require('twitter-text')

module.exports = function (app, requestIp, connection) {


    //TODO: add limiter for KEY


    //find dates, times, phones, links, emails, places,
    app.all('/textinfo', utils.allowCrossDomain, requestIp.mw(), function (req, res) {
        console.log('textinfo called ...');
        if (req.method === 'PUT' ||
            req.method === 'GET' ||
            req.method === 'DELETE' ||
            req.method === 'HEAD' ||
            req.method === 'TRACE' ||
            req.method === 'CONNECT') {
            console.log("syntax, Could not process METHOD :(", req.method);
            return res.status(422).send({error: "invalid_method"});
        }

        var track = req.body;
        if (!track.text || !track.type) {
            console.log("syntax, Could not identify message :(");
            return res.status(422).send({error: "invalid_message"});
        }

        var knwlInstance = new Knwl('english');
        // ======= GET ======= dates, times, phones, links, emails, places //
        knwlInstance.init(track.text);

        // ================= // =================
        // ================= dates
        // ================= // =================
        if (track.type === "dates") {
            return processResponse(knwlInstance.get('dates'));
        }

        // ================= // =================
        // ================= times
        // ================= // =================
        else if (track.type === "times") {
            return processResponse(knwlInstance.get('times'));
        }

        // ================= // =================
        // ================= phones
        // ================= // =================
        else if (track.type === "phones") {
                return processResponse(knwlInstance.get('phones'));
        }

        // ================= // =================
        // ================= links
        // ================= // =================
        else if (track.type === "links") {
                return processResponse(knwlInstance.get('links'));
        }

        // ================= // =================
        // ================= emails
        // ================= // =================
        else if (track.type === "emails") {
                return processResponse(knwlInstance.get('emails'));
        }

        // ================= // =================
        // ================= places
        // ================= // =================
        else if (track.type === "places") {
            return processResponse(knwlInstance.get('places'));
        }

        // ================= // =================
        // ================= twitter extractMentions
        // ================= // =================
        else if (track.type === "twitter-extractMentions") {
            return processResponse(twitter.extractMentions(twitter.htmlEscape(track.text)));
        }

        // ================= // =================
        // ================= twitter extractHashtags
        // ================= // =================
        else if (track.type === "twitter-extractHashtags") {
            return processResponse(twitter.extractMentions(twitter.htmlEscape(track.text)));

        }

        // ================= // =================
        // ================= twitter extractReplies
        // ================= // =================
        else if (track.type === "twitter-extractReplies") {
            return processResponse(twitter.extractReplies(twitter.htmlEscape(track.text)));

        }


        // ================= // =================
        // ================= twitter extractUrls
        // ================= // =================
        else if (track.type === "twitter-extractUrls") {
            return processResponse(twitter.extractUrls(twitter.htmlEscape(track.text)));

        }


        // ================= // =================
        // ================= twitter extractCashtags
        // ================= // =================
        else if (track.type === "twitter-extractCashtags") {
            return processResponse(twitter.extractCashtags(twitter.htmlEscape(track.text)));

        }


        else {
            console.log("/textinfo, Could not identify message type :(", track.type);
            return res.status(422).send({error: "invalid_type"});
        }


        function processResponse(response) {
            return res.send({status: "ok", response: response});
        }

    });


}