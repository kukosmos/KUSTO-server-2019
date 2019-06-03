var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //res.send('Hello');
  res.json({"kusteau":"app"});
});

module.exports = router;