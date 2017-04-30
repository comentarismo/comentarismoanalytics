var chai = require('chai');
var assert = chai.assert;

var request = require('request');

var Promise = require("bluebird");
Promise.promisifyAll(request, {multiArgs: true});

var utils = require("../utils");

var HOST = process.env.HOST || "localhost:3013";
var DEBUG_MODE_ON = process.env.DEBUG || true;

describe('Should process syntax post - error scenarios', function () {

    var str = "garblegarble";

    describe('POST syntax', function () {

        it('should return error for a invalid syntax hit', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax/invalid',
                method: 'POST',
                form: {type:"",text: ""}
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

        // ======= GET ======= noun, verb, adjective, adverb //


        // ======= IS ======= noun, verb, adjective, adverb //


        // ======= LOOKUP ======= noun, verb, adjective, adverb //


    });

});
