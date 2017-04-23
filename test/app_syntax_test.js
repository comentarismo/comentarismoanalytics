var chai = require('chai');
var assert = chai.assert;

var request = require('request');

var Promise = require("bluebird");
Promise.promisifyAll(request, {multiArgs: true});

var utils = require("../utils");

var HOST = process.env.HOST || "localhost:3013";
var DEBUG_MODE_ON = process.env.DEBUG || true;

describe('Should process syntax post', function () {

    var str = "The angry bear chased the frightened little squirrel",
        expected = {
            nouns: [ 'bear', 'squirrel', 'little', 'chased' ],
            verbs: [ 'bear' ],
            adjectives: [ 'little', 'angry', 'frightened' ],
            adverbs: [ 'little' ],
            rest: [ 'The' ],
        };

    describe('POST syntax', function () {


        it('should return ok for a valid hit - getPOS', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"getPOS",text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameMembers(syntax.response.nouns, expected.nouns);
                        assert.sameMembers(syntax.response.verbs, expected.verbs);
                        assert.sameMembers(syntax.response.adjectives, expected.adjectives);
                        assert.sameMembers(syntax.response.adverbs, expected.adverbs);
                        assert.sameMembers(syntax.response.rest, expected.rest);

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

        // ======= GET ======= noun, verb, adjective, adverb //

        it('should return ok for a valid hit - getNouns', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"getNouns",text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameMembers(syntax.response, expected.nouns);

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

        it('should return ok for a valid hit - getVerbs', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"getVerbs",text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameMembers(syntax.response, expected.verbs);

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

        it('should return ok for a valid hit - getAdjectives', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"getAdjectives",text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameMembers(syntax.response, expected.adjectives);

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

        it('should return ok for a valid hit - getAdverbs', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"getAdverbs",text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameMembers(syntax.response, expected.adverbs);

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

        // ======= IS ======= noun, verb, adjective, adverb //

        it('should return ok for a valid hit - isNoun', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"isNoun",text: expected.nouns[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.ok(syntax.response);
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

        it('should return ok for a valid hit - isVerb', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"isVerb",text: expected.verbs[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.ok(syntax.response);

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

        it('should return ok for a valid hit - isAdjective', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"isAdjective",text: expected.adjectives[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.ok(syntax.response);

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

        it('should return ok for a valid hit - isAdverb', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"isAdverb",text: expected.adverbs[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.ok(syntax.response);

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


        // ======= LOOKUP ======= noun, verb, adjective, adverb //

        it('should return ok for a valid hit - lookupNoun', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"lookupNoun",text: expected.nouns[1]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.equal(syntax.response.length, 2);
                        assert.equal(syntax.response[0].pos, 'n');
                        assert.equal(syntax.response[0].lemma, 'squirrel');

                        done();
                    }
                } catch (e) {
                    if (DEBUG_MODE_ON) {
                        console.log('Error while lookupNoun: ', e);
                        console.log("Body: ", body);
                        utils.dumpError(e);
                    }
                    done(e);
                }

            }).catch(function (e) {
                done(e)
            });
        });

        it('should return ok for a valid hit - lookupVerb', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"lookupVerb",text: expected.verbs[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.equal(syntax.response.length, 13);
                        assert.equal(syntax.response[0].pos, 'v');
                        assert.equal(syntax.response[0].lemma, 'bear');

                        done();
                    }
                } catch (e) {
                    if (DEBUG_MODE_ON) {
                        console.log('Error while lookupVerb: ', e);
                        console.log("Body: ", body);
                        utils.dumpError(e);
                    }
                    done(e);
                }

            }).catch(function (e) {
                done(e)
            });
        });

        it('should return ok for a valid hit - lookupAdjective', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"lookupAdjective",text: expected.adjectives[1]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.equal(syntax.response.length, 3);
                        assert.equal(syntax.response[0].pos, 'a');
                        assert.equal(syntax.response[0].lemma, 'angry');
                        done();
                    }
                } catch (e) {
                    if (DEBUG_MODE_ON) {
                        console.log('Error while lookupAdjective: ', e);
                        console.log("Body: ", body);
                        utils.dumpError(e);
                    }
                    done(e);
                }

            }).catch(function (e) {
                done(e)
            });
        });

        it('should return ok for a valid hit - lookupAdverb', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax',
                method: 'POST',
                form: {type:"lookupAdverb",text: expected.adverbs[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.equal(syntax.response.length, 1);
                        assert.equal(syntax.response[0].pos, 'r');
                        assert.equal(syntax.response[0].lemma, 'little');
                        done();
                    }
                } catch (e) {
                    if (DEBUG_MODE_ON) {
                        console.log('Error while lookupAdverb: ', e);
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
