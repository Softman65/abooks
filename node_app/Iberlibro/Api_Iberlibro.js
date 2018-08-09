module.exports = function (mysql,apiKey,apiUser) {
    console.log('Iberlibro Api login')
    console.log(apiKey,apiUser)
    return {
        xml_process : require('./xml_Iberlibro.js')(apiKey,apiUser),
        https : require('https'), // https server
        http : require('http'), // http server
        querystring : require('querystring'),
        url : require('url'), // url parser 
        convert : require('xml-js'),
        
        post: function(record, action, _cb){
            console.log(action)
            //debugger
            var _xml = this.xml_process.xmlIberbooks.xmlUnit(action, record,[])
            var callback = this.url.parse('https://inventoryupdate.abebooks.com:10027');

            var api_agent = 'abooks.bbdd.ovh'
            var text = {};
            text.success = true;
            text.data = {};
            text.data.site_name = 'inventoryupdate.abebooks.com';

            var options = {
                host: callback.hostname,
                port: callback.port,
                path: callback.path,
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    'Content-Length': _xml.length,
                    'User-Agent': api_agent,
                    'Referer': callback.protocol + '//' + callback.hostname
                },
               // body: _xml,
                rejectUnauthorized : false
            }
            
            protocol = this.https;
            convert = this.convert;
            //debugger

            var request = protocol.request(options, function (response) {
                //response.setEncoding('ISO-8859-1');
                var _cbresponse = ""
                response.on('data', function (cbresponse) {
                    _cbresponse+= cbresponse
                    //debugger
                });
                response.on('end', function () {
                    var _jsonResponse = convert.xml2js(_cbresponse.toString(), {compact: true})
                    
                    console.log('response received:')
                    console.log( _cbresponse.toString() );
                    console.log('***********************')
                    console.log( _jsonResponse );
                    console.log('***********************')
                    //debugger
                    _cb(_jsonResponse)
                    
                });
            });
            
            request.on('error', function (e) {
                    
                    console.log('problem with request: ');
                    console.log(e);
                    debugger;
            });

            //write data to server
            console.log(_xml)
            request.write(_xml);
            request.end();
        },
        askToDb:function(vendorListingid,price,callback){
            const iberlibro = this
            mysql.query("SELECT * FROM books WHERE vendorListingid=?;SELECT Count(*) as counter from iberlibro WHERE vendorListingid=?",[vendorListingid,vendorListingid],function(err,_IberRecord){
                debugger    
                iberlibro.askIberlibro(_IberRecord[0],_IberRecord[1],price , callback, iberlibro)
            })

        },
        askFromService:function(books,counter,price, callback){
            var action = price>0? counter[0].counter ==0 ?'add':'update':'delete'                   
            books[0].price_quantity = price * 1

            this.post( books[0] , action, function(response){
                callback([books,counter],response)
            })
        },
        sendtohost: function (req, records, cb) {
            var cadsql = ''
            var _this = this
            if (req.body.price_quantity != null) {

                if (req.body.price_quantity * 1 > 0) {
                    cadsql = "INSERT INTO iberlibro (vendorListingid,price_quantity,fecha_add) VALUES (?,?,NOW())  ON DUPLICATE KEY UPDATE price_quantity=?"
                    records[3][0].counter = 1
                } else {
                    cadsql = "DELETE FROM iberlibro WHERE vendorListingid=?"
                    records[3][0].counter = 0
                }
                var params = [req.query.vendorListingid, req.body.price_quantity, req.body.price_quantity]
                mysql.query(cadsql, params, function (err, _record) {

                    if (err)
                        debugger

                    _this.askFromService(records[1], records[3], records[1][0].price_quantity, function () {

                        cb(err)

                    })
                })
            } else {
                cb({ err: {} })
            }
        },
        form: function( req , cb ) {
            var _this = this
            this.askToDb(req.query.vendorListingid, req.body.price_quantity_Iberlibro * 1, function (_IberRecord, response) {
                if (_IberRecord[0][0].price_quantity > 0) {
                    cadsql = "INSERT INTO iberlibro (vendorListingid,price_quantity,fecha_add) VALUES (?,?,NOW())  ON DUPLICATE KEY UPDATE price_quantity=?"
                } else {
                    cadsql = "DELETE FROM iberlibro WHERE vendorListingid=?"
                }
                var params = [req.query.vendorListingid, req.body.price_quantity_Iberlibro, req.body.price_quantity_Iberlibro]
                mysql.query(cadsql, params, function (err, records) {
                    debugger
                    if (err)
                        debugger
                    cb(err, records, response)

                    //res.json({ body: req.body, err: err, records: records, iberlibro: response });
                })

            }) 
        }
    }
}