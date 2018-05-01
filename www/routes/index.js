﻿'use strict';
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
        multipleStatements: true,
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
    var order =""
    var filter=""
    if(req.query.sortField!=null)
        order = " ORDER BY "+req.query.sortField+" "+req.query.sortOrder
    if(req.query.title.length>0)
        filter = filter + (filter.length==0?" WHERE ":"")+"title LIKE '%"+req.query.title+"%' "

    if(req.query.author.length>0)
        filter = filter + (filter.length==0?" WHERE ":" AND ")+"author LIKE '%"+req.query.author+"%' "
    
    if(req.query._loc.length>0)
        filter = filter + (filter.length==0?" WHERE ":" AND ")+"_Loc = '"+req.query._loc+"' "
    

    var cadsql = "SELECT count(*) as total FROM books " + filter + ";SELECT * FROM books " + filter + order + " LIMIT "+(req.query.pageSize*(req.query.pageIndex-1)+1)+","+req.query.pageSize
    console.log(cadsql)
    mysql.connection.query(cadsql, function(err,records) {
         res.json({data:records[1],itemsCount:records[0][0].total*1});
         //debugger
     //res.send('hi')
     })
 });
 router.get('/api/books/total', function (req, res) {
    mysql.connection.query("SELECT count(*) as total FROM books ", function(err,records) {
        //debugger
        records[0].pages = cint(records[0].total / req.query.elems)
        records[0].elemsperpage = req.query.elems *1
        res.json(records[0]);
         //debugger
     //res.send('hi')
     })
 });
module.exports = router;
