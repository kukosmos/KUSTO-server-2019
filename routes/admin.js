var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const fs = require('fs');

router.get('/', function (req, res){
    res.send('Hello admin!');
});

router.get('/write', function (req, res){
    res.sendFile(__dirname+'/write.html');
});

//body-parser
router.use(bodyParser.urlencoded({extended: false}));
//body-parser을 이용해 파싱
router.use(bodyParser.json());

router.post('/write', function(req, res) {
    var obj = {};
    var category = req.body.category;

    obj.id = req.body.id;
    obj.restaurant = req.body.restaurant;
    obj.location = req.body.location;
    obj.rating = new Number(req.body.rating);
    obj.menues = req.body.menues;

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

/*
//미들웨어에서 파라미터 확인
router.use(function(req, res, next){
  console.log('첫번째 미들웨어에서 요청을 처리함.');

  var paramId = req.body.id || req.query.id;
  var paramRestaurant = req.body.restaurant || req.query.restaurant;
  var paramLocation = req.body.location || req.query.location;
  var paramRating = req.body.rating || req.query.rating;
  var paramMenues = req.body.menues || req.query.menues;
  
  res.writeHead('200',{'Content-type':'text/html;charset=utf8'});
  res.write('<h1>express 서버에서 응답한 결과입니다.</h1>');
  res.write('<div><p>param id: '+paramId+'</p></div>');
  res.write('<div><p>param restaurant: '+paramRestaurant+'</p></div>');
  res.write('<div><p>param location: '+paramLocation+'</p></div>');
  res.write('<div><p>param menues: '+paramMenues+'</p></div>');
  res.end();
  
});
*/

module.exports = router;