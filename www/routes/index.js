﻿'use strict';
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var xml = require('xml');

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
router.post('/api/books/update', function (req, res) {
    var cadsql= "SELECT *  FROM books WHERE idbooks="+ req.query.id+"; UPDATE books SET "
    var counter = 0
    var params = []
    if(!_.isEmpty(req.body)){
        _.each(req.body, function(value,key){
            counter++
            cadsql=cadsql+(counter>1?',':'')+key+"=?"
            params.push(value)
        })
        debugger
        mysql.connection.query(cadsql+" WHERE idbooks="+ req.query.id ,params, function(err,records) {
            if(err)
                debugger
            
            var iberRecord = '<?xml version="1.0" encoding="ISO-8859-1"?><inventoryUpdateRequest version="1.0"><action name="bookupdate"><username>artebooks39@gmail.com</username><password>guatemala016</password></action><AbebookList><Abebook>'
            iberRecord = iberRecord + '<transactionType>add</transactionType>'
            iberRecord = iberRecord + '<vendorBookID>'+records[0].idbooks+'</vendorBookID>'
            iberRecord = iberRecord + '<title>'+records[0].title+'</title>'
            iberRecord = iberRecord + '<author>'+records[0].author+'</author>'
            iberRecord = iberRecord + '<publisher>'+records[0].publisherName+'</publisher>'
            iberRecord = iberRecord + '<price currency="'+records[0].price_currency+'">'+records[0].price_quantity+'</price>'

            res.json({body:req.body,err:err,records:records});
        })
    }else{
        res.json(req.body);
    }
});
router.post('/api/books/key', function (req, res) {
    var cadsql = "SELECT count(*) as total FROM books WHERE vendorListingid= "+req.query.value 
    mysql.connection.query(cadsql, function(err,records) {
        if(err!=null){
            res.json({error:err, ok:false});
        }else{
            res.json({ok:records[0].total==0});
        }
        //debugger
    //res.send('hi')
    })
})
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
        filter = filter + (filter.length==0?" WHERE ":" AND ")+"_Loc LIKE '"+req.query._loc+"%' "
    
    if(req.query._sale.length>0)
        filter = filter + (filter.length==0?" WHERE ":" AND ")+"_Sale LIKE '"+req.query._sale+"%' "
    
    if(req.query.price_quantity.length>0)
        filter = filter + (filter.length==0?" WHERE ":" AND ")+"price_quantity = '"+req.query.price_quantity+"' "
    
    if(req.query.vendorListingid.length>0)
        filter = filter + (filter.length==0?" WHERE ":" AND ")+"vendorListingid = '"+req.query.vendorListingid+"' "

        
        

    var cadsql = "SELECT count(*) as total FROM books " + filter + ";SELECT * FROM books " + filter + order + (filter.length==0? " LIMIT "+(req.query.pageSize*(req.query.pageIndex-1)+1)+","+req.query.pageSize:'')
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
 router.get('/api/books/tables', function (req, res) {
    mysql.connection.query("SELECT DISTINCT name FROM iberTables; SELECT * FROM iberTables order by name,Description asc", function(err,records) {
        //debugger
        res.json(records);
         //debugger
     //res.send('hi')
     })
 });
module.exports = router;
