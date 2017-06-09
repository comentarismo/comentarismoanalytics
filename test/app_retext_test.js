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


        // ======= POST ======= equality //
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

        // ======= POST ======= equality //

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
        it('should return ok for a valid hit - overuse', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/overuse',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.overuse);

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
        it('should return ok for a valid hit - cliches', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/cliches',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.cliches);

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
        it('should return ok for a valid hit - dutch', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/dutch',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.dutch);

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
        it('should return ok for a valid hit - contractions', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/contractions',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.contractions);

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
        it('should return ok for a valid hit - diacritics', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/diacritics',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.diacritics);

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
        it('should return ok for a valid hit - english', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/english',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.english);

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
        it('should return ok for a valid hit - emoji', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/emoji',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.emoji);

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
        it('should return ok for a valid hit - indefinite-article', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/indefinite-article',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.indefinite_article);

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
        it('should return ok for a valid hit - keywords', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/keywords',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.keywords);

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
        it('should return ok for a valid hit - latin', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/latin',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.latin);

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
        it('should return ok for a valid hit - passive', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/passive',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.passive);

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
        it('should return ok for a valid hit - profanities', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/profanities',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.profanities);

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
        it('should return ok for a valid hit - readability', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/readability',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.readability);

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
        it('should return ok for a valid hit - redundant-acronyms', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/redundant-acronyms',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.redundant_acronyms);

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
        it('should return ok for a valid hit - repeated-words', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/repeated-words',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.repeated_words);

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
        it('should return ok for a valid hit - sentence-spacing', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/sentence-spacing',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.sentence_spacing);

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
        it('should return ok for a valid hit - sentiment', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/sentiment',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.sentiment);

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
        it('should return ok for a valid hit - smartypants', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/smartypants',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.smartypants);

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
        it('should return ok for a valid hit - spell', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/spell',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.spell);

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
        it('should return ok for a valid hit - stringify', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/stringify',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.stringify);

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
        it('should return ok for a valid hit - syntax-mentions', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/syntax-mentions',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.syntax_mentions);

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
        it('should return ok for a valid hit - quotes', function (done) {
            this.timeout(10000);

            var target = {
                url: 'http://' + HOST + '/retext/quotes',
                method: 'POST',
                form: {text: str}
            };

            request.postAsync(target).spread(function (response, body) {

                try {
                    var syntax = JSON.parse(body.toString('utf8'));
                    if (!syntax || syntax.error) {
                        done(new Error(syntax.error));
                    } else {

                        assert.sameDeepMembers(syntax, expected.quotes);

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

        // overuse
        // cliches
        //
        // usage
        //
        // simplify
        // equality
        //
        // contractions
        // diacritics
        // dutch
        // english
        // emoji
        // indefinite - article
        // keywords
        // latin
        // passive
        // profanities
        // readability
        // redundant - acronyms
        // repeated - words
        // sentence - spacing
        // sentiment
        // smartypants
        // spell
        // stringify
        // syntax - mentions
        // quotes


    });

});
