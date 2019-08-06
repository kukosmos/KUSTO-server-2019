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

router.get('/newid', function(req, res) {
    var meta_path = __dirname + '/../data/' + req.query['category'] + '/meta.json';
    var file = fs.readFileSync(meta_path, 'utf8');
    var meta = JSON.parse(file);

    res.send(('000' + meta.count).slice(-4));
});

router.post('/write', function(req, res) {
    var meta_path = __dirname + '/../data/' + req.body.category + '/meta.json';
    var file = fs.readFileSync(meta_path, 'utf8');
    var meta = JSON.parse(file);
    
    if(typeof(meta[req.body.id]) != 'undefined'){
        console.log('id = ' + req.body.id + " already exist");
        return;
    }
    
    
    var obj = {};
    var i = req.body.total_button;
    var menuArr = {};
    for(let j = 1; j <= i ; j++){
        var menu = req.body["menu["+j+"]"];
        var price = parseInt(req.body["price["+j+"]"]);
        menuArr[menu]=price;
    }
    var category = req.body.category;
    
    obj.id = req.body.id;
    obj.restaurant = req.body.restaurant;
    obj.location = req.body.location;
    obj.rating = 2.5
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
    
    
    var metaArr = {};
    meta.count = meta.count +1;
    metaArr['restaurant'] = req.body.restaurant;
    metaArr['rating'] = parseFloat(req.body.rating);
    meta[req.body.id] = metaArr;
    
    var data = JSON.stringify(meta, null, 2);
    fs.writeFile(meta_path, data, (err)=> {
        if(err){
            console.error();
        }
        else{
            console.log('done');
        }
    });
    
        
    
  });

module.exports = router;