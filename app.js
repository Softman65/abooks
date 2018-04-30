'use strict';

console.log('Hello world');

const mysql = {
    engine: require('mysql'),
    credentials: {
    host: '35.204.32.143',
    user: 'root',
    password: 'wotanonline',
    database: 'wotan_dev'
    }
}
mysql.connection = mysql.engine.createConnection(mysql.credentials);

var fs = require('fs'),
    path = require('path'),
    xmlReader = require('read-xml')

var FILE = path.join(__dirname, './20180318_InventarioAbeBooks.xml');
const cheerio = require('cheerio');
// pass a buffer or a path to a xml file
xmlReader.readXML(fs.readFileSync(FILE), function (err, data) {
    if (err) {
        console.error(err);
    }

    console.log('xml encoding:', data.encoding);
    console.log('Decoded xml:', data.content);

    var parser = require('xml2json');
    var json = JSON.parse(parser.toJson(data.content));
    debugger
});


