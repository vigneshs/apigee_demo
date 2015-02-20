var request = require('request');
var config = require('../../config');
var asynch = require('asynch');

module.exports = {
    getRestaurants: getRestaurants,
    getRestaurantById: getRestaurantById
}

function getRestaurants (req, res) {
    request(config.ug + '/restaurants', function (err, response, body) {
        res.send(body);
    });
}

function getRestaurantById (req, res) {
    var id = req.swagger.params.id.value;

    asynch.parallel([
        function (callback) {
            request(config.ug + '/restaurants?ql=restID=' + id, function (err, response, body) {
                callback(null, JSON.parse(body));
            });
        },

        function (callback) {
            request('http://localhost:10010/reviews?restId=' + id, function (err, response, body) {
                callback(null, JSON.parse(body));
            });
        }
    ], function (err, results) {
        res.send(results);
    });
}