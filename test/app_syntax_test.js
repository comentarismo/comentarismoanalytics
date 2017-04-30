var chai = require('chai');
var assert = chai.assert;

var request = require('request');

var Promise = require("bluebird");
Promise.promisifyAll(request, {multiArgs: true});

var utils = require("../utils");

var HOST = process.env.HOST || "localhost:3013";
var DEBUG_MODE_ON = process.env.DEBUG || true;

describe('Should process syntax post', function () {

    var str = "The irritated dog chased the frightened little cat",
        expected = {
            nouns: [ 'dog', 'chased', 'little', 'cat' ],
            verbs: [ 'dog','cat' ],
            adjectives: [ 'irritated', 'frightened' ,'little', ],
            adverbs: [ 'little' ],
            rest: [ 'The' ],
        };

    describe('POST syntax', function () {


        it('should return ok for a valid hit - getPOS', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/syntax/getPOS',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameMembers(syntax.nouns, expected.nouns);
                        assert.sameMembers(syntax.verbs, expected.verbs);
                        assert.sameMembers(syntax.adjectives, expected.adjectives);
                        assert.sameMembers(syntax.adverbs, expected.adverbs);
                        assert.sameMembers(syntax.rest, expected.rest);

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
                url: 'http://' + HOST + '/syntax/getNouns',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameMembers(syntax, expected.nouns);

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
                url: 'http://' + HOST + '/syntax/getVerbs',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameMembers(syntax, expected.verbs);

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
                url: 'http://' + HOST + '/syntax/getAdjectives',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameMembers(syntax, expected.adjectives);

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
                url: 'http://' + HOST + '/syntax/getAdverbs',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameMembers(syntax, expected.adverbs);

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
                url: 'http://' + HOST + '/syntax/isNoun',
                method: 'POST',
                form: {text: expected.nouns[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.ok(syntax);
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
                url: 'http://' + HOST + '/syntax/isVerb',
                method: 'POST',
                form: {text: expected.verbs[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.ok(syntax);

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
                url: 'http://' + HOST + '/syntax/isAdjective',
                method: 'POST',
                form: {text: expected.adjectives[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.ok(syntax);

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
                url: 'http://' + HOST + '/syntax/isAdverb',
                method: 'POST',
                form: {text: expected.adverbs[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.ok(syntax);

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
                url: 'http://' + HOST + '/syntax/lookupNoun',
                method: 'POST',
                form: {text: expected.nouns[1]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.equal(syntax.length, 1);
                        assert.equal(syntax[0].pos, 'n');
                        assert.equal(syntax[0].lemma, 'pursued');

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
                url: 'http://' + HOST + '/syntax/lookupVerb',
                method: 'POST',
                form: {text: expected.verbs[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.equal(syntax.length, 1);
                        assert.equal(syntax[0].pos, 'v');
                        assert.equal(syntax[0].lemma, 'chase');

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
                url: 'http://' + HOST + '/syntax/lookupAdjective',
                method: 'POST',
                form: {text: expected.adjectives[1]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.equal(syntax.length, 2);
                        assert.equal(syntax[0].pos, 's');
                        assert.equal(syntax[0].lemma, 'frightened');
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
                url: 'http://' + HOST + '/syntax/lookupAdverb',
                method: 'POST',
                form: {text: expected.adverbs[0]}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.equal(syntax.length, 1);
                        assert.equal(syntax[0].pos, 'r');
                        assert.equal(syntax[0].lemma, 'little');
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
