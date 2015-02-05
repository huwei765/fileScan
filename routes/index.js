var express = require('express');
var fs = require('fs');

var router = express.Router();

// var root_path = process.argv[2];
// var w_file = 'list.html'
// var w_content = getAllFiles(root_path).join('\n');

/* GET home page. */
router.get('/', function(req, res) {

    res.render('index', { title: 'File List' });

});

module.exports = router;
