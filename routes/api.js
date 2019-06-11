var express = require('express');
var router = express.Router();
var fs = require("fs")

var obj = {
    kusto: []
}

router.get('/', function (req, res){
    obj.kusto.push(req.query)
    json = JSON.stringify(obj);
    fs.writeFile( __dirname + "/../data/" + "kusto.json", json,'utf8', function (err, data){
        res.json(obj);
    });
})

module.exports = router;