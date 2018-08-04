'use strict';
var crypto = require('crypto')
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var xml = require('xml');
var request = require('request');




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
//debugger
console.log( 'LOGIN mysql')
//console.log( decrypt('1aa39d3af7a0f87f5af85f','abooks.bbdd.ovh') )
//console.log( decrypt('1cb49321f9be','abooks.bbdd.ovh') )
const mysql = {
    engine: require('mysql'),
    credentials: {
        multipleStatements: true,
        host: 'abooks.bbdd.ovh',
        user: 'root',
        password: decrypt('1aa39d3af7a0f87f5af85f','abooks.bbdd.ovh'),
        database: decrypt('1cb49321f9be','abooks.bbdd.ovh')
    }
}


mysql.connection = mysql.engine.createConnection(mysql.credentials);
mysql.connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }else{
        mysql.connection.query('SELECT * from Credentials', function(err,cred){
            var iberlibro = require('../../node_app/Api_Iberlibro.js')(mysql.connection, cred[0].IberLibro_apiKey, cred[0].IberLibro_apiUser)

            setInterval(function(){
                mysql.connection.query('SELECT 1 as counter', function(){
                    console.log('reconnected')
                })
            }, 60000*15)
            console.log('connected as id ' + mysql.connection.threadId);




            console.log('conected mysql')
            /* GET home page. */
            router.get('/', function (req, res) {
                res.render('index', { title: 'Express' });
            });
            router.get('/jq-selfie', function (req, res) {
                res.render('jq-selfie', { title: 'jq-selfie' });
            });

            router.post('/api/books/imageSave', function (req, res) {
                var cadsql = "call saveImageBook(?,?)"
                mysql.connection.query(cadsql, [req.query.vendorListingid,req.body.image], function(err, record){
                    res.json({err:err, record:record, image: req.body.image});
                })
            })
            router.post('/api/books/new', function (req, res) {
                debugger
                var cadsql= "INSERT INTO books ("
                var cadval = ""
                var counter = 0
                var params = []
                if(!_.isEmpty(req.body)){
                    _.each(req.body, function(value,key){
                        counter++
                        if(key.substr(0,1)!="_"){
                            cadsql=cadsql+(counter>1?',':'')+key
                            cadval=cadval+(counter>1?',?':'?')
                            params.push(value)
                        }
                    })
                    cadsql = cadsql + ") VALUES (" + cadval + ")"
                    debugger
                    mysql.connection.query(cadsql ,params, function(err,records) {
                        debugger
                        if(err)
                            debugger
                        
                        // var xml = require('../../node_app/xml_prepare.js')().xmlIberbooks(records[1][0],records[2],"new")
                        if(req.body._iberlibro=="on"){
                            //iberlibro.askToDb(req.query.vendorListingid,req.body.price_quantity*1,function(_IberRecord,response){
                                if(req.body.price_quantity*1>0){
                                    cadsql = "INSERT INTO iberlibro (vendorListingid,price_quantity,fecha_add) VALUES (?,?,NOW())  ON DUPLICATE KEY UPDATE price_quantity=?"
                                    //records[3] = [ {counter:1} ]
                                    var insertId = "0".repeat( 6-(records.insertId+"").length) + records.insertId
                                    var params = [insertId,req.body.price_quantity,req.body.price_quantity]
                                    mysql.connection.query(cadsql ,params, function(err,_record) {
                                        //debugger
                                        if(err)
                                            debugger
                                        var params = [insertId,req.body.price_quantity,req.body.price_quantity]
                                        mysql.connection.query('SELECT *  FROM books WHERE vendorListingid='+records.insertId+";Select 1 as counter;"  ,params, function(err,_record) {
                                            debugger
                                            iberlibro.askIberlibro(_record[0],_record[1],_record[0][0].price_quantity , function(){

                                                res.json({body:req.body,err:err,records:records});  
                                            }, iberlibro)
                                        })
                                    })
                                }else{
                                    res.json({body:req.body,err:err,records:records})
                                }
                            //})                                     
                            debugger

                        }else{
                            res.json({body:req.body,err:err,records:records})
                        }
                        
                    })
                }else{
                    res.json(req.body);
                }
            })
            router.post('/api/books/edit', function (req, res) {
                if(req.query.form=='formIberlibro'){
                    debugger
                    iberlibro.askToDb(req.query.vendorListingid,req.body.price_quantity_Iberlibro*1,function(_IberRecord,response){
                        if(_IberRecord[0][0].price_quantity>0){
                            cadsql = "INSERT INTO iberlibro (vendorListingid,price_quantity,fecha_add) VALUES (?,?,NOW())  ON DUPLICATE KEY UPDATE price_quantity=?"
                        }else{
                            cadsql = "DELETE FROM iberlibro WHERE vendorListingid=?"
                        }
                        var params = [req.query.vendorListingid,req.body.price_quantity_Iberlibro,req.body.price_quantity_Iberlibro]
                        mysql.connection.query(cadsql ,params, function(err,records) {
                            debugger
                            if(err)
                                debugger
                            res.json({body:req.body,err:err,records:records, iberlibro:response });
                        })

                    }) 
            
                }else{
                    if(req.query.form=='formAmazon'){
                        var cadsql = "INSERT INTO amazon (vendorListingid,price_quantity_ES,fecha_add) VALUES (?,?,NOW())  ON DUPLICATE KEY UPDATE price_quantity=?"
                        var params = [req.query.vendorListingid,req.body.price_quantity_ES,req.body.price_quantity_ES]
                        mysql.connection.query(cadsql ,params, function(err,records) {
                            if(err)
                                debugger
                            res.json({body:req.body,err:err,records:records});
                        })            
                    }else{
                        debugger
                        var cadsqlLast= "; SELECT *  FROM books WHERE vendorListingid="+ req.query.vendorListingid + ";SELECT * FROM pictures WHERE vendorListingid="+req.query.vendorListingid + ";SELECT COUNT(*) as counter FROM iberlibro WHERE vendorListingid=" + req.query.vendorListingid
                        var cadsql= "UPDATE books SET "
                        var counter = 0
                        var params = []
                        var _iberlibro = false

                        if(!_.isEmpty(req.body)){
                            _.each(req.body, function(value,key){
                                debugger
                                counter++
                                if(key!='_iberlibro'){
                                    cadsql=cadsql+(counter>1?',':'')+key+"=?"
                                    params.push(value)
                                }else{
                                    _iberlibro = (value == 'on' ? true : false)
                                }
                            })
                            debugger
                            mysql.connection.query(cadsql+" WHERE vendorListingid="+ req.query.vendorListingid + cadsqlLast ,params, function(err,records) {
                                if(err){
                                    debugger
                                }else{
                                    if(_iberlibro){
                                        //iberlibro.askToDb(req.query.vendorListingid,req.body.price_quantity*1,function(_IberRecord,response){
                                            if(req.body.price_quantity*1>0){
                                                cadsql = "INSERT INTO iberlibro (vendorListingid,price_quantity,fecha_add) VALUES (?,?,NOW())  ON DUPLICATE KEY UPDATE price_quantity=?"
                                                records[3][0].counter = 1
                                            }else{
                                                cadsql = "DELETE FROM iberlibro WHERE vendorListingid=?"
                                                records[3][0].counter = 0
                                            }
                                            var params = [req.query.vendorListingid,req.body.price_quantity,req.body.price_quantity]
                                            mysql.connection.query(cadsql ,params, function(err,_record) {
                                                debugger
                                                if(err)
                                                    debugger
                                                iberlibro.askIberlibro(records[1],records[3],records[1][0].price_quantity , function(){
                                                    
                                                    res.json({body:req.body,err:err,records:records});  
                                                }, iberlibro)
                                            })
                                        //})                                     
                                        debugger

                                    }else{
                                        res.json({body:req.body,err:err,records:records})
                                    }
                                }
                                //if(records[3][0].counter)

                            // res.json({body:req.body,err:err,records:records});
                            })
                        }else{
                            res.json(req.body);
                        }
                    }
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
            router.get('/api/iberlibro/delete', function (req, res) {
                var _e = req.query.e*1
                var _t = req.query.t*1
                var cadsql = "SELECT (@cnt := @cnt + 1) AS rowNumber, t.* FROM abooks.iberlibro as t  CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE rowNumber=?"
                mysql.connection.query(cadsql,[_e], function(err,records) {
                    if(err)
                        console.log(err)
                    console.log(records)
                    res.json({last: (_e++) == _t, e:_e++ , vendorListingid: records[0].vendorListingid })
                })
            })
            router.get('/api/books/totales', function (req, res) {
                var cadsql = "SELECT * from contadores" 
                mysql.connection.query(cadsql, function(err,records) {
                    if(err!=null){
                        if(records.length==1)
                            res.write(records[0].image);
                    }else{
                        res.json({Total:records[0].Total,TIberlibro:records[0].TotalIberlibro});
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
                order = " ORDER BY vendorListingid desc"
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
                    join = "FROM books LEFT JOIN pictures on pictures.vendorListingid = books.vendorListingid  LEFT JOIN iberlibro on iberlibro.vendorListingid = books.vendorListingid LEFT JOIN amazon on amazon.vendorListingid = books.vendorListingid"
                    fields = _fields()+',books.vendorListingid,books.price_quantity,iberlibro.price_quantity as price_quantity_Iberlibro,pictures.image as img,(SELECT count(0) from iberlibro where iberlibro.vendorListingid = books.vendorListingid) as C_iberlibro ,(SELECT count(0) from amazon where amazon.vendorListingid = books.vendorListingid) as C_amazon , bookfinder '
                }

                if(req.query.type=='iberlibro'){
                    from = "FROM iberlibro "
                    join = "FROM iberlibro LEFT JOIN books on iberlibro.vendorListingid = books.vendorListingid LEFT JOIN pictures on pictures.vendorListingid = books.vendorListingid "
                    fields = _fields()+',iberlibro.vendorListingid,books.price_quantity,iberlibro.price_quantity as price_quantity,books.bookfinder,pictures.image as img '
                }
                if(req.query.type=='amazon'){
                    from = "FROM amazon "
                    join = "FROM amazon LEFT JOIN books on amazon.vendorListingid = books.vendorListingid LEFT JOIN pictures on pictures.vendorListingid = books.vendorListingid "
                    fields = _fields()+',amazon.vendorListingid,amazon.price_quantity_ES,amazon.price_quantity_DE,amazon.price_quantity_FR,amazon.price_quantity_IT,amazon.price_quantity_UK,books.bookfinder,pictures.image as img '
                }
                const _pageSize = req.query.pageSize!=null?req.query.pageSize:10
                const _pageIndex = req.query.pageIndex!=null?req.query.pageIndex:1 
                var cadsql = "SELECT count(*) as total FROM books " + filter + ";SELECT count(*) as total FROM iberlibro LEFT JOIN books on iberlibro.vendorListingid = books.vendorListingid " + filter + ";SELECT count(*) as total FROM amazon LEFT JOIN books on amazon.vendorListingid = books.vendorListingid" + filter + ";SELECT "+ (fields + join + filter + order) + (filter.length==0? " LIMIT "+( _pageSize *(_pageIndex-1))+","+_pageSize:'')
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
            router.get('/api/bookfinder', function (req, res) {
                var url = "https://www.bookfinder.com/search/"
                if(req.originalUrl.indexOf('?urlquery=')==-1){
                    mysql.connection.query('SELECT  bookfinder(vendorListingid) as url, bookfinder as state  from books WHERE vendorListingid=?',[req.query.id], function(err,records) {
                        //debugger
                        request.get(records[0].url, function(err, response, body) {
                    // access data from other web site here
                            res.json({ state: records[0].state , body: body});
                        });
                        //res.json(records);
                        //debugger
                    //res.send('hi')
                    })
                }else{
                    request.get(url+"?"+req.originalUrl.split('?urlquery=')[1], function(err, response, body) {
                        // access data from other web site here
                        res.json( { err:err, response:response ,body:body} );
                    });        
                }
            });
        })
    }
});




module.exports = router;
