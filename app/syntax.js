var utils = require("../utils");
var WordPOS = require('wordpos');
var wordpos = new WordPOS({profile: false});

module.exports = function (app, requestIp, connection) {


    //TODO: add limiter for KEY

    app.all('/syntax/:type', utils.allowCrossDomain, requestIp.mw(), function (req, res) {
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
        var type = req.params.type;

        if (!track.text || !type) {
            console.log("syntax, Could not identify message, type -> ", type, track);
            return res.status(422).send({error: "invalid_message"});
        }
        console.log('syntax called ...' + type);

        type = type.toLowerCase();

        // ======= GET ======= noun, verb, adjective, adverb //


        // ================= // =================
        // ================= getPOS
        // ================= // =================
        if (type === "getpos") {
            return wordpos.getPOS(track.text, processResponse);
        }

        // ================= // =================
        // ================= getNouns
        // ================= // =================
        if (type === "getnouns") {
            return wordpos.getNouns(track.text, processResponse);
        }

        // ================= // =================
        // ================= getVerbs
        // ================= // =================
        else if (type === "getverbs") {
            return wordpos.getVerbs(track.text, processResponse);
        }

        // ================= // =================
        // ================= getAdjectives
        // ================= // =================
        else if (type === "getadjectives") {
            return wordpos.getAdjectives(track.text, processResponse);
        }

        // ================= // =================
        // ================= getAdverbs
        // ================= // =================
        else if (type === "getadverbs") {
            return wordpos.getAdverbs(track.text, processResponse);
        }

        // ================= // =================
        // ======= IS ======= noun, verb, adjective, adverb //
        // ================= // =================


        // ================= // =================
        // ================= isNoun
        // ================= // =================
        else if (type === "isnoun") {
            return wordpos.isNoun(track.text, processResponse);
        }

        // ================= // =================
        // ================= isVerb
        // ================= // =================
        else if (type === "isverb") {
            return wordpos.isVerb(track.text, processResponse);

        }

        // ================= // =================
        // ================= isAdjective
        // ================= // =================
        else if (type === "isadjective") {
            return wordpos.isAdjective(track.text, processResponse);

        }

        // ================= // =================
        // ================= isAdverb
        // ================= // =================
        else if (type === "isadverb") {
            return wordpos.isAdverb(track.text, processResponse);
        }

        // ================= // =================
        // ================= lookup
        // ================= // =================
        else if (type === "lookup") {
            return wordpos.lookup(track.text, processResponse);
        }

        // ================= // =================
        // ================= lookupNoun
        // ================= // =================
        else if (type === "lookupnoun") {
            return wordpos.lookupNoun(track.text, processResponse);
        }

        // ================= // =================
        // ================= lookupVerb
        // ================= // =================
        else if (type === "lookupverb") {
            return wordpos.lookupVerb(track.text, processResponse);
        }

        // ================= // =================
        // ================= lookupAdjective
        // ================= // =================
        else if (type === "lookupadjective") {
            return wordpos.lookupAdjective(track.text, processResponse);
        }

        // ================= // =================
        // ================= lookupAdverb
        // ================= // =================
        else if (type === "lookupadverb") {
            return wordpos.lookupAdverb(track.text, processResponse);

        } else {
            console.log("Could not identify message type :(", track.type);
            return res.status(422).send({error: "invalid_type"});
        }


        function processResponse(response) {
            return res.send(response);
        }

    });


}