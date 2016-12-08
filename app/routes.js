var port = process.env.PORT || 3113;

module.exports = function (app) {

    var ip = null;
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        ip = "http://" + add + ":" + port + "/";
    });

    app.get('/hc', function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send({ip: ip});
    });

};








