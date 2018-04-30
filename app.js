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

    console.log('xml encoding:', data.encoding);
    console.log('Decoded xml:', data.content);

    var parser = require('xml2json');
    var json = JSON.parse(parser.toJson( encoding.convert( data.content, 'utf-8', data.encoding )));
    _.each()
});


