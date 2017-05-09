var chai = require('chai');
var assert = chai.assert;

var request = require('request');

var Promise = require("bluebird");
Promise.promisifyAll(request, {multiArgs: true});

var utils = require("../utils");

var HOST = process.env.HOST || "localhost:3013";
var DEBUG_MODE_ON = process.env.DEBUG || true;

describe('Should process syntax post', function () {

    var str = 'Hey guys, utilize a shorter word.',
        expected = {
            equality: [{
                "messages": [{
                    "reason": "`guys` may be insensitive, use `people`, `persons`, `folks` instead",
                    "line": 1,
                    "column": 5,
                    "location": {
                        "start": {"line": 1, "column": 5, "offset": 4},
                        "end": {"line": 1, "column": 9, "offset": 8}
                    },
                    "ruleId": "gals-men"
                }]
            }]
            ,
            simplify: [{
                "messages": [{
                    "reason": "Replace “utilize” with “use”",
                    "line": 1,
                    "column": 11,
                    "location": {
                        "start": {"line": 1, "column": 11, "offset": 10},
                        "end": {"line": 1, "column": 18, "offset": 17}
                    },
                    "ruleId": "utilize"
                }]
            }]
        };

    describe('POST syntax', function () {


        it('should return ok for a valid hit - simplify', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/simplify',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.simplify);

                        done();
                    }
                } catch (e) {
                    if (DEBUG_MODE_ON) {
                        console.log('Error while tracking: ', body);
                        utils.dumpError(e);
                    }
                    done(e);
                }

            }).catch(function (e) {
                done(e)
            });
        });

        // ======= GET ======= equality //

        it('should return ok for a valid hit - equality', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/equality',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.equality);

                        done();
                    }
                } catch (e) {
                    if (DEBUG_MODE_ON) {
                        console.log('Error while tracking: ', body);
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
