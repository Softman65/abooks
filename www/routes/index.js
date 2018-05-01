'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
router.get('/api/books', function (req, res) {
    // mysql.connection("SELECT * FROM books LIMIT 1,50", function(err,records) {
     //    res.send(JSON.stringify(records));
     debugger
     res.send('hi')
     //})
 });
module.exports = router;
