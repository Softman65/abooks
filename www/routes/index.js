'use strict';
var crypto = require('crypto')
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

function decrypt(text,secret){
    var decipher = crypto.createDecipher('aes-256-ctr',secret)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}
debugger
console.log( 'LOGIN')
//console.log( decrypt('1aa39d3af7a0f87f5af85f','abooks.bbdd.ovh') )
//console.log( decrypt('1cb49321f9be','abooks.bbdd.ovh') )
const mysql = {
    engine: require('mysql'),
    credentials: {
        multipleStatements: true,
        host: '127.0.0.1',
        user: 'root',
        password: decrypt('1aa39d3af7a0f87f5af85f','abooks.bbdd.ovh'),
        database: decrypt('1cb49321f9be','abooks.bbdd.ovh')
    }
}
console.log(mysql.credentials.password)

mysql.connection = mysql.engine.createConnection(mysql.credentials);
console.log('LOGIN')
mysql.connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + mysql.connection.threadId);
});

console.log('conected mysql')
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
router.get('/jq-selfie', function (req, res) {
    res.render('jq-selfie', { title: 'jq-selfie' });
});
router.get('/acems', function (req, res) {
    res.render('acems', { title: 'acems' });
});
router.post('/api/books/imageSave', function (req, res) {
    var cadsql = "call saveImageBook(?,?)"
    mysql.connection.query(cadsql, [req.query.vendorListingid,req.body.image], function(err, record){
        res.json({err:err, record:record, image: req.body.image});
    })
})
router.post('/api/books/edit', function (req, res) {
    debugger
    var cadsql= "SELECT *  FROM books WHERE idbooks="+ req.query.id+";SELECT * FROM pictures WHERE vendorListingid="+req.query.vendorListingid+"; UPDATE books SET "
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
            
                var xml = require('../../node_app/xml_prepare.js')().xmlIberbooks(records[0][0],records[1],"update")

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
router.post('/api/books/img', function (req, res) {
    var cadsql = "SELECT image FROM pictures WHERE vendorListingid= "+req.query.ref 
    mysql.connection.query(cadsql, function(err,records) {
        if(err!=null){
            if(records.length==1)
                res.write(records[0].image);
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
    var from = ""
    var join = ""
    var fields = ""
    const _fields = function(){
        const arr = [`title`,`author`,`publisherName`,
                    `publishYear`,
                    `publishPlace`,
                    `publishYearText`,
                    `description`,
                    `productType`,
                    `edition`,
                    `bookCondition`,
                    `inscriptionType`,
                    `bindingText`,
                    `jacketCondition`,
                    `universalIdentifier_number`,
                    `buyerSearchAttribute`,
                    `_loc`,
                    `_sale`,
                    `_dateSale`,
                    `subject`]
        return arr.join(",")

        
        
    }
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
    
    if(req.query.type=='all'){
        from = "FROM books "
        join = "FROM books LEFT JOIN pictures on pictures.vendorListingid = books.vendorListingid "
        fields = _fields()+',books.vendorListingid,books.price_quantity,pictures.image as img '
    }

    if(req.query.type=='iberlibro'){
        from = "FROM iberlibro "
        join = "FROM iberlibro LEFT JOIN books on iberlibro.vendorListingid = books.vendorListingid LEFT JOIN pictures on pictures.vendorListingid = books.vendorListingid "
        fields = _fields()+',iberlibro.vendorListingid,iberlibro.price_quantity,pictures.image as img '
    }
    if(req.query.type=='amazon'){
        from = "FROM amazon "
        join = "FROM amazon LEFT JOIN books on iberlibro.vendorListingid = books.vendorListingid LEFT JOIN pictures on pictures.vendorListingid = books.vendorListingid "
        fields = _fields()+',amazon.price_quantity,pictures.image as img '
    }
    var cadsql = "SELECT count(*) as total FROM books " + filter + ";SELECT count(*) as total FROM iberlibro " + filter + ";SELECT count(*) as total FROM amazon " + filter + ";SELECT "+ (fields + join + filter + order) + (filter.length==0? " LIMIT "+(req.query.pageSize*(req.query.pageIndex-1))+","+req.query.pageSize:'')
    console.log(req.query.type)
    console.log(cadsql)
    mysql.connection.query(cadsql, function(err,records) {
         res.json({err:err,cadsql : cadsql,data:records[3],itemsCount:records[0][0].total*1,iberlibro:records[1][0].total*1,amazon:records[2][0].total*1});
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
