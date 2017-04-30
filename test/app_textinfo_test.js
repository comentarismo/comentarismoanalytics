var chai = require('chai');
var assert = chai.assert;

var request = require('request');

var Promise = require("bluebird");
Promise.promisifyAll(request, {multiArgs: true});

var utils = require("../utils");

var HOST = process.env.HOST || "localhost:3013";
var DEBUG_MODE_ON = process.env.DEBUG || true;

describe('Should process text info post', function () {


    var expected = {
        dates: [
            " the 28th of december.",
            " the 28th of jan.",
            " the 28th of january.",
            " the 28th of feb.",
            " the 28th of february.",
            " the 28th of march.",
            " the 28th of mar.",
            " the 28th of april.",
            " the 28th of apr.",
            " the 28th of may.",
            " the 28th of june.",
            " the 28th of jun.",
            " the 28th of july.",
            " the 28th of jul.",
            " the 28th of august.",
            " the 28th of aug.",
            " the 28th of september.",
            " the 28th of sept.",
            " the 28th of october.",
            " the 28th of oct.",
            " the 28th of november.",
            " the 28th of nov.",
            " the 28th of december.",
            " the 28th of dec.",
            "I will see you on 2013-12-15",
            "I will see you on 2014-12-15",
        ],
        times: [
            " 12:54 AM, ",
            " 12:54 pm, ",
            " 12am, ",
            " 12:35 AM and 11:54 pm "],
        phones: [
            "My phone number is 555-5555",
            "My phone number is 5-5555555",
            "My phone number is 5555555555",
            "My phone number is 555-555-5555",
            "My phone number is 555 555-5555",
            "My phone number is 555 555 5555",
            "My phone number is (555) 555-5555",
            "My phone number is (555)555-5555",
            "My phone number is (555)-555-5555",
            "My phone number is 555 5555555",
            "My phone number is (555) 5555555",
            "My phone number is 5-555-555-5555",
            "My phone number is 5 555 555-5555",
            "My phone number is 5 (555) 555-5555",
            "My phone number is (5)(555)555-5555",
            "My phone number is +5 (555) 555-5555",
            "My phone number is 5555555555",
            "My phone number is 555-555-5555",
            "My phone number is 555 555-5555",
            "My phone number is (555) 555-5555",
            "My phone number is (555)555-5555",
            "My phone number is (555)-555-5555",
            "My phone number is 555 5555555",
            "My phone number is 5-555-555-5555",
            "My phone number is 5 555 555-5555",
            "My phone number is 5 (555) 555-5555",
            "My phone number is (5) 555-555-5555",
            "My phone number is +5 (555) 555-5555",
            "My phone number is 55-555-555-5555",
            "My phone number is 555-555-555-5555",],
        links: [
            "Follow me on twitter at http://twitter.com/twitter",
            "Follow me on twitter at http://twitter.com/%20twitter",
            "Follow me on twitter at http://twitter.co.uk/twitter",
            "Check this out! http://coolevent.com:80/test?a=b#url",
            "Follow me on twitter at https://twitter.com/twitter",
            "Follow me on twitter at ftp://ftp.debian.org/debian/",
            "Follow me on twitter at ftp://test:test@ftp.debian.org/debian/",
            "Take a look at this link goqsdttg://www.facebook.com"],
        emails: {
            valid: [
                "test@test.com",
                "test@test.co.uk",
                "test.test@test.com",
                "test+test@test.com",
                "sir.Test+testing@test.com",
                "test@testdeparetment.testcorp.com",
                "12341234@123.com",
                "123123123@test.com",
                "test@10.0.0.1",
                "test-man@test.com",
                "test@test-corp.com"
            ],
            invalid: [
                ".@test.com",
                "@",
                "what",
                "",
                "@test.com",
                "test@test",
                "あいうえお@example.com"
            ]
        },
        places: [
            "They live at Los Angeles",
            "They live near Tesco.",
            "They live close to Tesco."]
    };

    describe('POST syntax', function () {

        // ======= GET ======= dates, times, phones, links, emails, places //

        it('should return ok for a valid hit - dates', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/textinfo/dates',
                method: 'POST',
                form: {text: expected.dates[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {
                        assert.deepEqual(syntax[0].month + "/" + syntax[0].day, "12/28");
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


        it('should return ok for a valid hit - times', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/textinfo/times',
                method: 'POST',
                form: {text: expected.times[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {
                        assert.deepEqual(syntax[0].hour, "12");
                        assert.deepEqual(syntax[0].minute, "54");
                        assert.deepEqual(syntax[0].daynight, "AM");
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

        it('should return ok for a valid hit - phones', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/textinfo/phones',
                method: 'POST',
                form: {text: expected.phones[2]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {
                        assert.deepEqual(syntax.length, 1);
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

        it('should return ok for a valid hit - links', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/textinfo/links',
                method: 'POST',
                form: {text: expected.links[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {
                        assert.deepEqual(syntax[0].link, "http://twitter.com/twitter");
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

        for (var i = expected.emails.valid.length - 1; i >= 0; i--) {
            var ve = expected.emails.valid[i];
            it('should return ok for a valid hit - emails -> ' + ve, function (done) {
                this.timeout(10000);

                var target = {
                    url: 'http://' + HOST + '/textinfo/emails',
                    method: 'POST',
                    form: {text: "You can reach me on " + ve}
                };

                request.postAsync(target).spread(function (response, body) {

                    try {
                        var syntax = JSON.parse(body.toString('utf8'));
                        if (!syntax || syntax.error) {
                            done(new Error(syntax.error));
                        } else {
                            assert.deepEqual(syntax[0].address, ve);
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

        }

        it('should return ok for a valid hit - places', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/textinfo/places',
                method: 'POST',
                form: {text: expected.places[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {
                        assert.deepEqual(syntax[0].place, "Los Angeles");
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
