var request = require('request');
var config = require('../../config');

module.exports = {
    getReviews: getReviews,
    postReview: postReview
}

function getReviews (req, res) {
    var restaurantId = req.swagger.params.restId.value;
    var path;
    if (restaurantId) {
        path = '/reviews?ql=restID=' + restaurantId;
    } else {
        path = '/reviews';
    }
    request(config.ug + path, function (err, response, body) {
        res.send(body);
    });
}

function postReview (req, res) {
    request.post(config.ug + '/reviews', {form: JSON.stringify(req.body)}, function (err, response, body) {
        res.send(body);
    });
}