var DEBUG_MODE_ON = process.env.DEBUG || true;
var request = require('request');
var Promise = require("bluebird");
Promise.promisifyAll(request, {multiArgs: true});
var utils = require("../utils");

var assert = require('chai').assert;


var HOST = process.env.HOST || "localhost:3013"

describe('Should process analytics post', function () {

    describe('Validate Health Check', function () {
        it('should return ok for /hc hit', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/hc',
                method: 'GET'
            };

            request.getAsync(target).spread(function (response, body) {

                try {
                    var hc = JSON.parse(body.toString('utf8'));
                    if (!hc || hc.error) {
                        console.log("Error: ", hc);
                        done(new Error("Should have returned ok but not ?"));
                    } else {

                        assert.isDefined(hc.ip, "Expected to get ip back but got nothing :(");
                        assert.isNotNull(hc.ip, "Expected to get ip but got nothing :(");

                        assert.deepEqual(hc.ip, 'http://127.0.1.1:3113/');

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
            })
        })

    })

    describe('POST analytics', function () {

        it('should return error for a invalid track hit', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/analytics',
                method: 'POST',
                form: {track: null}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var track = JSON.parse(body.toString('utf8'));
                    if (!track || track.error) {
                        done();
                    } else {
                        done(new Error("Should have returned error but not ?"));
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


        it('should return ok for a track hit', function (done) {
            this.timeout(10000);

            var track = {
                "browser": {"name": "Chrome", "version": "49.0.2623.112", "major": "49"},
                "os": {"name": "Mac OS", "version": "10.8.5"},
                "engine": {"version": "537.36", "name": "WebKit"},
                "language": "en",
                "date": "Sun Nov 13 2016 17:21:58 GMT+0000",
                "screen": {"screen": "1280x800", "orientation": 0},
                "mobile": false,
                "type": "view",
                "fp": "68d038b17d2b21c1289bac13222ba970",
                "operator": "bbcuk",
                "key": "ASD123"
            };

            var target = {
                url: 'http://' + HOST + '/analytics',
                method: 'POST',
                form: {track: track}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var track = JSON.parse(body.toString('utf8'));
                    if (!track || track.error) {
                        done(new Error(track.error));
                    } else {
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
