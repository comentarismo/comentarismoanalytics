const logger = require('./server/logger_middleware/server').logger

module.exports.printErrorMsg = function (json, validDate,
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

    logger.log('------------------------------');

    if (validDate) {
        logger.error('ERROR: invalid Date --> ' + json.date);
        resultMsg = strvalidDate;
    } else if (validCategories) {
        logger.error('ERROR: invalid Categories --> ' + json.categories);
        resultMsg = strvalidCategories;
    } else if (validCountries) {
        logger.error('ERROR: invalid Countries --> ' + json.countries);
        resultMsg = strvalidCountries;
    } else if (validLanguages) {
        logger.error('ERROR: invalid Languages --> ' + json.languages);
        resultMsg = strvalidLanguages;
    } else if (validOperator) {
        logger.error('ERROR: invalid Operator --> ' + json.operator);
        resultMsg = strvalidOperator;
    } else if (validGenre) {
        logger.error('ERROR: invalid Genre --> ' + json.genre);
        resultMsg = strvalidGenre;
    } else if (validTitle) {
        logger.error('ERROR: invalid Title --> ' + json.title);
        resultMsg = strvalidTitle;
    } else if (validTitleurlize) {
        logger.error('ERROR: invalid Titleurlize --> ' + json.titleurlize);
        resultMsg = strvalidTitleurlize;
    } else if (validCommentaries_length) {
        logger.error('ERROR: invalid Commentaries Length --> ' + json.commentaries.length);
        resultMsg = strvalidCommentaries_length;
    }

    logger.error('ERROR: no ' + resultMsg + ' found for this page ' + json.link);
    logger.error('------------------------------');
    logger.error('Nothing to save.');
    logger.error('------------------------------');
    logger.error('job is done, sending message to state machine that is all good to trigger next run!');

    return resultMsg;
}

/**
 *
 * @param err
 */
module.exports.dumpError = function dumpError(err) {
    if (typeof err === 'object') {
        if (err.message) {
            logger.error('\nMessage: ' + err.message)
        }
        if (err.stack) {
            logger.error('\nStacktrace:');
            logger.error('====================');
            logger.error(err.stack);
        }
    } else {
        logger.error('dumpError :: argument is not an object');
    }
};


//CORS middleware
module.exports.allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', "DELETE, GET, HEAD, POST, PUT, OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, COMENTARISMO-KEY');
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 2);

    res.header('Content-Type', "application/json");

    res.header("Access-Control-Allow-Credentials", "true");

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
};
