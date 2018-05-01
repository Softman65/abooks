'use strict';
var express = require('express');
var router = express.Router();

function cint(num, opt_infinityBiased) {
    var m = Math, c = m.ceil, f = m.floor, r = m.round;
    num = +num;
    if (opt_infinityBiased) {
        return num < 0 ? r(num) : f(num);
    }
    if (opt_infinityBiased == null) {
        return num < 0 ? -r(-num) : r(num);
    }
    return num < 0 ? c(num) : f(num);
}

const mysql = {
    engine: require('mysql'),
    credentials: {
        host: 'localhost',
        user: 'root',
        password: 'guatemala016',
        database: 'abooks'
    }
}
mysql.connection = mysql.engine.createConnection(mysql.credentials);
mysql.connection.connect();
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
router.get('/api/books/page', function (req, res) {
    mysql.connection.query("SELECT * FROM books LIMIT "+(req.query.total*(req.query.page-1)+1)+","+req.query.total, function(err,records) {
         res.send(JSON.stringify(records));
         //debugger
     //res.send('hi')
     })
 });
 router.get('/api/books/total', function (req, res) {
    mysql.connection.query("SELECT count(*) as total FROM books ", function(err,records) {
        debugger
        records[0].pages = cint(records[0].pages / req.query.elems)
        records[0].elemsperpage = req.query.elems
        res.send(JSON.stringify(records));
         //debugger
     //res.send('hi')
     })
 });
module.exports = router;
