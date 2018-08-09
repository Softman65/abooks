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

            var books = require("../../node_app/Api_Books.js")(mysql,_,cred)

            //var iberlibro = require('../../node_app/Iberlibro/Api_Iberlibro.js')(mysql.connection, cred[0].IberLibro_apiKey, cred[0].IberLibro_apiUser)
            //var amazon = require('../../node_app/Amazon/Api_Iberlibro.js')(mysql.connection, cred[0].IberLibro_apiKey, cred[0].IberLibro_apiUser)

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



            router.post('/api/books/edit', function (req, res) {
                if(req.query.form=='formIberlibro'){
                    //debugger
                    books.iberlibro.form(req, function (err,records,response) {
                        if (err)
                            debugger
                        res.json({ body: req.body, err: err, records: records, iberlibro: response });
                    })
             
                }else{
                    if (req.query.form == 'formAmazon') {

                        books.amazon.form(req, function (err, records) {
                            if (err)
                                debugger
                            res.json({ body: req.body, err: err, records: records });
                        })            
                    }else{
                        if(!_.isEmpty(req.body)){
                            books.form(req, function (err, records) {
                                res.json({ body: req.body, err: err, records: records });
                            })
                        }else{
                            res.json(req.body);
                        }
                    }
                }
            });



            router.get('/api/iberlibro/delete', function (req, res) {

                var _e = req.query.e*1
                var _l = req.query.l*1
                var _p = req.query.p*1
                var _t = req.query.t*1
                if(_t<_p){
                    _t = 0
                }else{
                    _t = _t + 1
                }   
                var cadsql = "SELECT (@cnt := @cnt + 1) AS rowNumber, t.* FROM abooks.iberlibro as t  CROSS JOIN (SELECT @cnt := 0) AS dummy ORDER by @cnt desc LIMIT "+_e+",1"
                //console.log(cadsql)
                mysql.connection.query(cadsql, function(err,records) {
                    if(err)
                        console.log(err)
                    console.log(records)
                    res.json({next: _e < _l, e:_e+1 ,t:_t, vendorListingid: records[0].vendorListingid })
                })
                
            })
            router.get('/api/books/totales', function (req, res) {
                books.totales(req, function (err, records) {
                    if(err!=null){
                        if(records.length==1)
                            res.write(records[0].image);
                    }else{
                        res.json({Total:records[0].Total,TIberlibro:records[0].TotalIberlibro});
                    }
                })            
            })
            router.get('/api/books/page', function (req, res) {
                books.page(req, function (err, records, cadsql ) {
                    const _counter = req.query.type == 'all' ? records[0][0].total * 1 : req.query.type == 'iberlibro' ? records[1][0].total * 1 : records[2][0].total * 1
                    res.json({err:err,cadsql : cadsql,data:records[3],itemsCount: _counter ,iberlibro:records[1][0].total*1,amazon:records[2][0].total*1});
                    //debugger
                //res.send('hi')
                })
            });
            router.get('/api/books/total', function (req, res) {
                books.totales(req, function (err, records) {
                    res.json(records[0]);
                })
            });
            router.get('/api/books/tables', function (req, res) {
                books.tables(req, function (err, records) {
                    res.json(records);
                })
            });
            router.post('/api/books/imageSave', function (req, res) {
                books.imageSave(req, function (err, record) {
                    res.json({ err: err, record: record, image: req.body.image });

                })
            })
            router.post('/api/books/new', function (req, res) {
                if (!_.isEmpty(req.body)) {
                    books.new(req, function (err, records) {
                        res.json({ body: req.body, err: err, records: records })
                    })
                } else {
                    res.json(req.body);
                }
            })
            router.post('/api/books/key', function (req, res) {
                books.key(req, function (err, records) {
                    if (err != null) {
                        res.json({ error: err, ok: false });
                    } else {
                        res.json({ ok: records[0].total == 0 });
                    }
                })
            })
            router.post('/api/books/img', function (req, res) {
                books.img(req, function (err, records) {
                    if (err != null) {
                        if (records.length == 1)
                            res.write(records[0].image);
                    } else {
                        res.json({ ok: records[0].total == 0 });
                    }
                })
            })

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
