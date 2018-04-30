'use strict';

console.log('Hello world');



var fs = require('fs'),
    path = require('path'),
    xmlReader = require('read-xml'),
    encoding = require("encoding");

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
    var json = parser.toJson(data.content);
    debugger
});


