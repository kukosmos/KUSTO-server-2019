var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const fs = require('fs');

router.get('/', function (req, res){
    res.send('Hello admin!');
});

router.get('/write', function (req, res){
    res.render('admin/write.html');
});

//body-parser
router.use(bodyParser.urlencoded({extended: false}));
//body-parser을 이용해 파싱
router.use(bodyParser.json());

router.post('/write', function(req, res) {
    var obj = {};
    var menu = req.body.menues;
    var price = parseInt(req.body.price)
    var menuArr = {
       [menu] : price
    };
    var category = req.body.category;
    
    obj.id = req.body.id;
    obj.restaurant = req.body.restaurant;
    obj.location = req.body.location;
    obj.rating = parseInt(req.body.rating);
    obj.menues = menuArr;

    var json = JSON.stringify(obj, null, 2);
    fs.writeFile('data/'+category+'/'+req.body.id+'.json', json, (err)=> {
        if(err){
            console.error();
        }
        else{
            console.log('done');
        }
    });
  });

module.exports = router;
