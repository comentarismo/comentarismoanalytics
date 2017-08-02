module.exports.printErrorMsg = function(json, validDate,
                       validCategories,
                       validCountries,
                       validLanguages,
                       validOperator,
                       validGenre,
                       validTitle,
                       validTitleurlize,
                       validCommentaries_length) {

    const strvalidDate = "date";
    const strvalidCategories = "categories";
    const strvalidCountries = "countries";
    const strvalidLanguages = "languages";
    const strvalidOperator = "operator";
    const strvalidGenre = "genre";
    const strvalidTitle = "title";
    const strvalidTitleurlize = "titleurlize";
    const strvalidCommentaries_length = "commentaries length";

    var resultMsg = "";

    console.log('------------------------------');

    if (validDate) {
        console.log('ERROR: invalid Date --> ' + json.date);
        resultMsg = strvalidDate;
    } else if (validCategories) {
        console.log('ERROR: invalid Categories --> ' + json.categories);
        resultMsg = strvalidCategories;
    } else if (validCountries) {
        console.log('ERROR: invalid Countries --> ' + json.countries);
        resultMsg = strvalidCountries;
    } else if (validLanguages) {
        console.log('ERROR: invalid Languages --> ' + json.languages);
        resultMsg = strvalidLanguages;
    } else if (validOperator) {
        console.log('ERROR: invalid Operator --> ' + json.operator);
        resultMsg = strvalidOperator;
    } else if (validGenre) {
        console.log('ERROR: invalid Genre --> ' + json.genre);
        resultMsg = strvalidGenre;
    } else if (validTitle) {
        console.log('ERROR: invalid Title --> ' + json.title);
        resultMsg = strvalidTitle;
    } else if (validTitleurlize) {
        console.log('ERROR: invalid Titleurlize --> ' + json.titleurlize);
        resultMsg = strvalidTitleurlize;
    } else if (validCommentaries_length) {
        console.log('ERROR: invalid Commentaries Length --> ' + json.commentaries.length);
        resultMsg = strvalidCommentaries_length;
    }

    console.log('ERROR: no ' + resultMsg + ' found for this page ' + json.link);
    console.log('------------------------------');
    console.log('Nothing to save.');
    console.log('------------------------------');
    console.log('job is done, sending message to state machine that is all good to trigger next run!');

    return resultMsg;
}

/**
 *
 * @param err
 */
module.exports.dumpError = function dumpError(err) {
    if (typeof err === 'object') {
        if (err.message) {
            console.log('\nMessage: ' + err.message)
        }
        if (err.stack) {
            console.log('\nStacktrace:');
            console.log('====================');
            console.log(err.stack);
        }
    } else {
        console.log('dumpError :: argument is not an object');
    }
};



//CORS middleware
module.exports.allowCrossDomain = function (req, res, next) {
    var oneof = false;
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if (req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', "DELETE, GET, HEAD, POST, PUT, OPTIONS");
        oneof = true;
    }
    if (req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, COMENTARISMO-KEY');
        oneof = true;
    }
    if (oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 2);
    }

    res.header('Content-Type', "application/json");

    // intercept OPTIONS method
    if (oneof && (req.method === 'OPTIONS' )) {
        res.send(200);
    }
    else {
        next();
    }
};
