'use strict';

console.log('Hello world');

var fs = require('fs');
var express = require('express');
var path = require('path');

var http = require('http');
var https = require('https');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./www/routes/index');


var privateKey = fs.readFileSync('//home/debian/cert/private.key');
var certificate = fs.readFileSync('//home/debian/cert/certificate.crt');

var credentials = {key: privateKey, cert: certificate};

var app =   express() //.createServer(credentials);

// view engine setup
app.set('views', path.join(__dirname, 'www/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'www/public')));

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//app.set('port', 80);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);

//var server = app.listen(app.get('port'), function () {
//    console.log('Express server listening on port ' + server.address().port);
    //upgradeDb()
//});
console.log('Hello world');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'abooks.bbdd.ovh';

function upgradeDb(){
    function decrypt(text,secret){
        var decipher = crypto.createDecipher('aes-256-ctr',secret)
        var dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }

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
    mysql.connection.connect();

    const RecordToParamsInsert = function(JsonRecord){
        return [
            JsonRecord.vendorListingid!=null?JsonRecord.vendorListingid:null,
            JsonRecord.title!=null?JsonRecord.title:null,
            JsonRecord.author!=null?JsonRecord.author:null,
            JsonRecord.price_currency!=null?JsonRecord.price_currency:null,
            JsonRecord.price_quantity!=null?JsonRecord.price_quantity:null,
            JsonRecord.quantity_limit!=null?JsonRecord.quantity_limit:null,
            JsonRecord.quantity_amount!=null?JsonRecord.quantity_amount:null,
            JsonRecord.publisherName!=null?JsonRecord.publisherName:null,
            JsonRecord.publishYear!=null?JsonRecord.publishYear:null,
            JsonRecord.publishYearText!=null?JsonRecord.publishYearText:null,
            JsonRecord.description!=null?JsonRecord.description:null,
            JsonRecord.bookCondition!=null?JsonRecord.bookCondition:null,
            JsonRecord.bindingText!=null?JsonRecord.bindingText:null,
            JsonRecord.universalIdentifier_isvalid!=null?JsonRecord.universalIdentifier_isvalid:null,
            JsonRecord.universalIdentifier_numberType!=null?JsonRecord.universalIdentifier_numberType:null,
            JsonRecord.universalIdentifier_number!=null?JsonRecord.universalIdentifier_number:null,
            JsonRecord.buyerSearchAttribute!=null? JsonRecord.buyerSearchAttribute.join(','):null,
            JsonRecord._loc!=null? JsonRecord._loc:null
        ]
    }
    const convertToRecord = function(JsonRecord){
        const cleanDesc = function(value){
            var _ret = value
            if(_ret!=null){
                var _s = value.match(/xslib\d{1,2}\w{0,3}/gi)

                if(_s!=null)                                      
                    _.each(_s,function(_v){
                        _ret = _.replace(_ret,_v,'').replace(". ","")
                    })
            }
            return _ret==null?null:_ret.length>0?_ret:null
        }
        const getLoc = function(value){
            var _ret = null
            if(value!=null){
                var _s = value.match(/xslib\d{1,2}\w{0,3}/gi)

                if(_s!=null)                                      
                    _.each(_s,function(_v){
                        _ret = _v.toLowerCase().replace('xslib','').toUpperCase()
                    })
            }
            return _ret
        }
        const getcodes = function(codes){
            var _ret = []
            _.each(codes, function(data){
                _ret.push(data.bsacode)
            })
            return _ret
        }
        var _out = {
            vendorListingid:JsonRecord.vendorListingid,
            author:JsonRecord.author,
            title:JsonRecord.title,
            description:cleanDesc(JsonRecord.description),
            bookCondition:JsonRecord.bookCondition,
            listingsid:JsonRecord.listingsid,
            price_currency:JsonRecord.price.currency,
            price_quantity:JsonRecord.price.$t,
            quantity_limit:JsonRecord.quantity.limit,
            quantity_amount:JsonRecord.quantity.amount,
            bindingText:JsonRecord.bindingText,
            
            buyerSearchAttribute: getcodes(JsonRecord.buyerSearchAttribute),
            _loc:getLoc(JsonRecord.description)
        }
        if(JsonRecord.universalIdentifier){
            _out.universalIdentifier_isvalid=JsonRecord.universalIdentifier.isvalid=='true'?true:false,
            _out.universalIdentifier_numberType=JsonRecord.universalIdentifier.numberType
            _out.universalIdentifier_number=JsonRecord.universalIdentifier.number
        }

        if(JsonRecord.publisher){
            _out.publishPlace=JsonRecord.publishPlace,
            _out.publisherName=JsonRecord.publisher.publisherName
            _out.publishYear=JsonRecord.publisher.publishYear
            _out.publishYearText=JsonRecord.publisher.publishYearText
        }
        return _out
    }


    var fs = require('fs'),
        path = require('path'),
        xmlReader = require('read-xml'),
        encoding = require("encoding"),
        _ = require('lodash');

    var FILE = path.join(__dirname, './20180318_InventarioAbeBooks.xml');
    // pass a buffer or a path to a xml file
    xmlReader.readXML(fs.readFileSync(FILE), function (err, data) {
        if (err) {
            console.error(err);
        }

        //console.log('xml encoding:', data.encoding);
        //console.log('Decoded xml:', data.content);

        var parser = require('xml2json');
        var json = JSON.parse(parser.toJson( encoding.convert( data.content, 'utf-8', data.encoding )));
        var detectVariations = function(newData,oldData){
            var _resp = ''
            _.each(oldData, function(value,key){
                var _sep = ""
                if(oldData[key]!=value){
                    
                    if(_.isString(value))
                        sep="'"
                    _resp =_resp + (_resp.length>0?',':'') + key + "=" + _sep + value + _sep
                }
            })
            return _resp
        }
        var go = function(BookListing,_e, fn, callback ){
            
            if(BookListing[_e]!=null){
                var params = []
                var record = convertToRecord(BookListing[_e])
                var cadsql = ""
                mysql.connection.query( "SELECT * FROM books where vendorListingid=?",[record.vendorListingid], function(err,dbdata){
                    if(dbdata.length==0){
                        cadsql = "INSERT INTO books (vendorListingid,title,author,price_currency,price_quantity,quantity_limit,quantity_amount,publisherName,publishYear,publishYearText,description,bookCondition,bindingText,universalIdentifier_isvalid,universalIdentifier_numberType,universalIdentifier_number,buyerSearchAttribute,_loc) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                        params = RecordToParamsInsert(record)
                    }else{
                        var fields = detectVariations(record,dbdata[0])
                        if(fields.length>0){
                            cadsql = "UPDATE books SET " + fields + " WHERE vendorListingid=?"
                            params = [record.vendorListingid]
                        }
                    }
                    if(cadsql.length>0){
                        mysql.connection.query(cadsql,params, function(err,dbdata){
                            if(err)
                                debugger    
                            console.log(_e, record.title)
                            _e++
                            fn(BookListing,_e, fn, callback )
                        })
                }else{
                    _e++
                    fn(BookListing,_e, fn, callback )
                }
                    
                })
            }else{
                callback()
            }
        }
        go(json.BookListingInventory.BookListing,0, go, function(){
            debugger
        })
    });
}


