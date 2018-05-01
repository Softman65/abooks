'use strict';
var express = require('express');
var router = express.Router();

//const mysql = {
//    engine: require('mysql'),
//    credentials: {
//        host: 'localhost',
//        user: 'root',
//        password: 'guatemala016',
//        database: 'abooks'
/////    }
//}
//mysql.connection = mysql.engine.createConnection(mysql.credentials);
//mysql.connection.connect();

/* GET users listing. */
router.get('/api/books', function (req, res) {
   // mysql.connection("SELECT * FROM books LIMIT 1,50", function(err,records) {
    //    res.send(JSON.stringify(records));
    res.send('hi')
    //})
});

module.exports = router;