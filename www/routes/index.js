'use strict';
var express = require('express');
var router = express.Router();

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
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
router.get('/api/books', function (req, res) {
    mysql.connection.query("SELECT * FROM books LIMIT "+req.query.page+","+req.query.total, function(err,records) {
         res.send(JSON.stringify(records));
         debugger
     //res.send('hi')
     })
 });
module.exports = router;
