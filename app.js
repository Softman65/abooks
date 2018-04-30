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
    return {
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
        universalIdentifier_isvalid:JsonRecord.universalIdentifier.isvalid,
        universalIdentifier_numberType:JsonRecord.universalIdentifier.numberType,
        universalIdentifier_number:JsonRecord.universalIdentifier.number,
        buyerSearchAttribute: getcodes(JsonRecord.buyerSearchAttribute)
    }
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
    _.each(json.BookListingInventory.BookListing, function(book){
        
        var record = convertToRecord(book)
        debugger
    })
});


