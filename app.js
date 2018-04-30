'use strict';

console.log('Hello world');

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


const convertToRecord = function(JsonRecord){
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
        description:JsonRecord.description,
        bookCondition:JsonRecord.bookCondition,
        listingsid:JsonRecord.listingsid,
        price_currency:JsonRecord.price.currency,
        price_quantity:JsonRecord.price.$t,
        quantity_limit:JsonRecord.quantity.limit,
        quantity_amount:JsonRecord.quantity.amount,
        publisherName:JsonRecord.publisher.publisherName,
        publishYear:JsonRecord.publisher.publishYear,
        publishYearText:JsonRecord.publisher.publishYearText,
        bindingText:JsonRecord.bindingText,
        buyerSearchAttribute: getcodes(JsonRecord.buyerSearchAttribute)
    }
    if(JsonRecord.universalIdentifier){
        _out.universalIdentifier_isvalid=JsonRecord.universalIdentifier.isvalid
        _out.universalIdentifier_numberType=JsonRecord.universalIdentifier.numberType
        _out.universalIdentifier_number=JsonRecord.universalIdentifier.number
    }

    if(JsonRecord.publisher){
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

    var go = function(BookListing,_e, fn, callback ){
        
        if(BookListing.length>_e){
            _e++
            var record = convertToRecord(BookListing[_e])
            console.log(record.title)
            fn(BookListing,_e, fn, callback )
        }else{
            callback()
        }
    }
    go(json.BookListingInventory.BookListing,0, go, function(){
        debugger
    })
});


