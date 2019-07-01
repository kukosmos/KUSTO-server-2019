var express = require('express');
var router = express.Router();
var fs = require("fs");
var Chance = require('chance');
var chance = new Chance();

function min2(a, b){
    return a > b ? b : a;
}

function range(n){
    var r = [];
    for(var i = 0; i < n; i++){
        r.push(i);
    }
    return r;
}

function popIndex(arr, idx){
    arr.splice(idx, 1);
}

function readJson(path){
    var file = fs.readFileSync(path, 'utf8');
    return JSON.parse(file);
}

function getRestaurants(category){
    var meta_path = __dirname + '/../data/' + category + '/meta.json';
    var json = readJson(meta_path);
    var restaurants = [];
    Object.keys(json).forEach(id => {
        restaurants.push(json[id]);
    });
    return restaurants;
}

router.get('/', function (req, res){
    var categories = ['korean', 'china', 'japan', 'america', 'school', 'desert', 'guitar', 'night', 'fast'];
    var candidates = [];
    categories.forEach(c => {
        if (typeof(req.query[c]) == 'undefined') {
            // do nothing
        } else {
            getRestaurants(c).forEach(r => {
                candidates.push(r);
            })
        }
    });
    var idxs = range(candidates.length);
    var weights = [];
    candidates.forEach(element => {
        weights.push(element.rating);
    });
    var n = min2(3, candidates.length);
    var restaurants = [];
    for(var i = 0; i < n; i++){
        var chosen = chance.weighted(idxs, weights);
        var idx = idxs.indexOf(chosen);
        popIndex(idxs, idx);
        popIndex(weights, idx);
        restaurants.push(candidates[chosen])
    }
    json = JSON.stringify(restaurants);
    res.json(restaurants);
});

module.exports = router;