var express = require('express');
var router = express.Router();
// var fs = require("fs");

router.get('/', function (req, res){
    var obj = [];
    obj.push(req.query);
    json = JSON.stringify(obj);
    res.json(obj);
    // fs.writeFile( __dirname + "/../data/" + "kusto.json", json,'utf8', function (err, data){
    //     res.json(obj);
    // });
});

module.exports = router;