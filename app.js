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
    JsonRecord.buyerSearchAttribute!=null? JsonRecord.buyerSearchAttribute.join(','):null
 ]
}
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
        bindingText:JsonRecord.bindingText,
        buyerSearchAttribute: getcodes(JsonRecord.buyerSearchAttribute)
    }
    if(JsonRecord.universalIdentifier){
        _out.universalIdentifier_isvalid=JsonRecord.universalIdentifier.isvalid=='true'?true:false,
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
            var cadsql = "SELECT * FROM books where vendorListingid=?"
            mysql.connection.query(cadsql,[record.vendorListingid], function(err,dbdata){
                if(dbdata.length==0){
                    cadsql = "INSERT INTO books (vendorListingid,tittle,author,price_currency,price_quantity,quantity_limit,quantity_amount,publisherName,publishYear,publishYearText,description,bookCondition,bindingText,universalIdentifier_isvalid,universalIdentifier_numberType,universalIdentifier_number,buyerSearchAttribute) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
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


