var utils = require("../utils");
var retext = require('retext');

var dutch = require('../retext/retext/packages/retext-dutch');
var stringify = require('../retext/retext/packages/retext-stringify');
var english = require('../retext/retext/packages/retext-english');
var latin = require('../retext/retext/packages/retext-latin');


var reporter = require('./vfile-reporter-json');

var overuse = require('../retext/retext-overuse');

var cliches = require('../retext/retext-cliches');
var usage = require('../retext/retext-usage');

var equality = require('../retext/retext-equality');
var simplify = require('../retext/retext-simplify');
var contractions = require('../retext/retext-contractions');
var diacritics = require('../retext/retext-diacritics');
var emoji = require('../retext/retext-emoji');
var indefinite_article = require('../retext/retext-indefinite-article');
var keywords = require('../retext/retext-keywords');
var passive = require('../retext/retext-passive');
var profanities = require('../retext/retext-profanities');
var readability = require('../retext/retext-readability');
var redundant_acronyms = require('../retext/retext-redundant-acronyms');
var repeated_words = require('../retext/retext-repeated-words');
var sentence_spacing = require('../retext/retext-sentence-spacing');
var sentiment = require('../retext/retext-sentiment');
var smartypants = require('../retext/retext-smartypants');
var spell = require('../retext/retext-spell');
var syntax_mentions = require('../retext/retext-syntax-mentions');
var quotes = require('../retext/retext-quotes');

var enUS = require('dictionary-en-us');
var enGB = require('dictionary-en-gb');

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
        // ================= simplify - Check phrases for simpler alternatives
        // ================= // =================
        if (type === "simplify") {
            return r.use(simplify)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= equality - Warn about possible insensitive, inconsiderate language;
        // ================= // =================
        else if (type === "equality") {
            return r.use(equality)
                .process(track.text, processResponse)
        }


        // ================= // =================
        // ================= equality -
        // ================= // =================
        else if (type === "equality") {
            return r.use(equality)
                .process(track.text, processResponse)
        }


        // ================= // =================
        // ================= overuse - Check words for overuse;
        // ================= // =================
        else if (type === "overuse") {
            return r.use(overuse)
                .process(track.text, processResponse)
        }
        // ================= // =================
        // ================= cliches - Check phrases for cliches;
        // ================= // =================
        else if (type === "cliches") {
            return r.use(cliches)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= usage - Check incorrect English usage;
        // ================= // =================
        else if (type === "usage") {
            return r.use(usage)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= contractions - Check apostrophe use in contractions;
        // ================= // =================
        else if (type === "contractions") {
            return r.use(contractions)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= diacritics - Check for proper use of diacritics;
        // ================= // =================
        else if (type === "diacritics") {
            return r.use(diacritics)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= dutch - Dutch language support;
        // ================= // =================
        else if (type === "dutch") {
            return r.use(dutch)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= english - English language support;
        // ================= // =================
        else if (type === "english") {
            return r.use(english)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= emoji - Encode or decode Gemojis;
        // ================= // =================
        else if (type === "emoji") {
            return r.use(emoji)
                .process(track.text, processResponse)
        }


        // ================= // =================
        // ================= indefinite-article - Check if indefinite articles (a, an) are used correctly;
        // ================= // =================
        else if (type === "indefinite-article") {
            return r.use(indefinite_article)
                .process(track.text, processResponse)
        }


        // ================= // =================
        // ================= keywords - Extract keywords and keyphrases;
        // ================= // =================
        else if (type === "keywords") {
            return r.use(keywords)
                .process(track.text, processResponse)
        }


        // ================= // =================
        // ================= latin - Latin-script language support;
        // ================= // =================
        else if (type === "latin") {
            return r.use(latin)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= passive - Check for passive voice;
        // ================= // =================
        else if (type === "passive") {
            return r.use(passive)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= profanities - Check profane and vulgar wording;
        // ================= // =================
        else if (type === "profanities") {
            return r.use(profanities)
                .process(track.text, processResponse)
        }


        // ================= // =================
        // ================= readability - Check readability;
        // ================= // =================
        else if (type === "readability") {
            return r.use(readability)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= redundant-acronyms - Check redundant acronyms (ATM machine > ATM);
        // ================= // =================
        else if (type === "redundant-acronyms") {
            return r.use(redundant_acronyms)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= repeated-words - Check for for repeated words;
        // ================= // =================
        else if (type === "repeated-words") {
            return r.use(repeated_words)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= sentence-spacing - Check spacing between sentences;
        // ================= // =================
        else if (type === "sentence-spacing") {
            return r.use(sentence_spacing)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= sentiment -  Detect sentiment in text;
        // ================= // =================
        else if (type === "sentiment") {
            return r.use(sentiment)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= smartypants - Implementation of SmartyPants;
        // ================= // =================
        else if (type === "smartypants") {
            return r.use(smartypants)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= spell - Spelling checker;
        // ================= // =================
        else if (type === "spell") {
            return r.use(spell, enUS)
                .process('color', processResponse)
        }

        // ================= // =================
        // ================= stringify - Compile back to text;
        // ================= // =================
        else if (type === "stringify") {
            return r.use(stringify)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= syntax-mentions - Classify @mentions as syntax;
        // ================= // =================
        else if (type === "syntax-mentions") {
            return r.use(syntax_mentions)
                .process(track.text, processResponse)
        }

        // ================= // =================
        // ================= quotes - Check quote and apostrophe usage.
        // ================= // =================
        else if (type === "quotes") {
            return r.use(quotes)
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