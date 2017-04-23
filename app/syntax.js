var utils = require("../utils");
var WordPOS = require('wordpos');
var wordpos = new WordPOS({profile: false});

module.exports = function (app, requestIp, connection) {


    //TODO: add limiter for KEY

    app.all('/syntax', utils.allowCrossDomain, requestIp.mw(), function (req, res) {
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
        console.log('syntax called ...' + track.type);


        // ======= GET ======= noun, verb, adjective, adverb //


        // ================= // =================
        // ================= getPOS
        // ================= // =================
        if (track.type === "getPOS") {
            return wordpos.getPOS(track.text, processResponse);
        }

        // ================= // =================
        // ================= getNouns
        // ================= // =================
        if (track.type === "getNouns") {
            wordpos.getNouns(track.text, processResponse);
            return
            // getVerbs
        } else if (track.type === "getVerbs") {
            return wordpos.getVerbs(track.text, processResponse);
        }

        // ================= // =================
        // ================= getAdjectives
        // ================= // =================
        else if (track.type === "getAdjectives") {
            return wordpos.getAdjectives(track.text, processResponse);
        }

        // ================= // =================
        // ================= getAdverbs
        // ================= // =================
        else if (track.type === "getAdverbs") {
            return wordpos.getAdverbs(track.text, processResponse);
        }

        // ================= // =================
        // ======= IS ======= noun, verb, adjective, adverb //
        // ================= // =================


        // ================= // =================
        // ================= isNoun
        // ================= // =================
        else if (track.type === "isNoun") {
            return wordpos.isNoun(track.text, processResponse);
        }

        // ================= // =================
        // ================= isVerb
        // ================= // =================
        else if (track.type === "isVerb") {
            return wordpos.isVerb(track.text, processResponse);

        }

        // ================= // =================
        // ================= isAdjective
        // ================= // =================
        else if (track.type === "isAdjective") {
            return wordpos.isAdjective(track.text, processResponse);

        }

        // ================= // =================
        // ================= isAdverb
        // ================= // =================
        else if (track.type === "isAdverb") {
            return wordpos.isAdverb(track.text, processResponse);
        }

        // ================= // =================
        // ================= lookup
        // ================= // =================
        else if (track.type === "lookup") {
            return wordpos.lookup(track.text, processResponse);
        }

        // ================= // =================
        // ================= lookupNoun
        // ================= // =================
        else if (track.type === "lookupNoun") {
            return wordpos.lookupNoun(track.text, processResponse);
        }

        // ================= // =================
        // ================= lookupVerb
        // ================= // =================
        else if (track.type === "lookupVerb") {
            return wordpos.lookupVerb(track.text, processResponse);
        }

        // ================= // =================
        // ================= lookupAdjective
        // ================= // =================
        else if (track.type === "lookupAdjective") {
            return wordpos.lookupAdjective(track.text, processResponse);
        }

        // ================= // =================
        // ================= lookupAdverb
        // ================= // =================
        else if (track.type === "lookupAdverb") {
            return wordpos.lookupAdverb(track.text, processResponse);

        } else {
            console.log("Could not identify message type :(", track.type);
            return res.status(422).send({error: "invalid_type"});
        }


        function processResponse(response) {
            return res.send({status: "ok", response: response});
        }

    });


}