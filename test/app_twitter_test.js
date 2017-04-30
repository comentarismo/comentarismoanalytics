var chai = require('chai');
var assert = chai.assert;

var request = require('request');

var Promise = require("bluebird");
Promise.promisifyAll(request, {multiArgs: true});

var utils = require("../utils");

var HOST = process.env.HOST || "localhost:3013";
var DEBUG_MODE_ON = process.env.DEBUG || true;

describe('Should process twitter text', function () {


    var expected = {
        twitts: [
            "#hashtag Mentioning @twitter and @jack, #baby",
            "Message with hyphenated-url.com",
            "<a href=\"https://twitter.com\" target=\"_blank\">twitter & friends</a>",
            "&lt;a href=&quot;https://twitter.com&quot; target=&quot;_blank&quot;&gt;twitter &amp; friends&lt;/a&gt;"
        ]
    };

    describe('POST twitts', function () {

        // ======= POST ======= extractMentions, extractHashtags, extractUrls //

        it('should return ok for a valid hit - extractMentions', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/twitter/extractMentions',
                method: 'POST',
                form: {text: expected.twitts[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {
                        assert.deepEqual(syntax, [ 'twitter', 'jack' ]);
                        done();
                    }
                } catch (e) {
                    if (DEBUG_MODE_ON) {
                        console.log('Error while tracking: ', e);
                        console.log("Body: ", body);
                        utils.dumpError(e);
                    }
                    done(e);
                }

            }).catch(function (e) {
                done(e)
            });
        });

        it('should return ok for a valid hit - extractHashtags', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/twitter/extractHashtags',
                method: 'POST',
                form: {text: expected.twitts[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {
                        assert.deepEqual(syntax, [ 'hashtag', 'baby' ]);
                        done();
                    }
                } catch (e) {
                    if (DEBUG_MODE_ON) {
                        console.log('Error while tracking: ', e);
                        console.log("Body: ", body);
                        utils.dumpError(e);
                    }
                    done(e);
                }

            }).catch(function (e) {
                done(e)
            });
        });


        it('should return ok for a valid hit - extractUrls', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/twitter/extractUrls',
                method: 'POST',
                form: {text: expected.twitts[1]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {
                        assert.deepEqual(syntax, [ 'hyphenated-url.com'  ]);
                        done();
                    }
                } catch (e) {
                    if (DEBUG_MODE_ON) {
                        console.log('Error while tracking: ', e);
                        console.log("Body: ", body);
                        utils.dumpError(e);
                    }
                    done(e);
                }

            }).catch(function (e) {
                done(e)
            });
        });





    });

});
