module.exports = function (_, mysql,apiKey,apiUser) {
    console.log('Iberlibro Api login')
    console.log(apiKey,apiUser)
    var _this = {
        xml_process : require('./xml_Iberlibro.js')(apiKey,apiUser),
        https : require('https'), // https server
        http : require('http'), // http server
        querystring : require('querystring'),
        url : require('url'), // url parser 
        convert : require('xml-js'),
        
        post: function( _xml , _cb){
            //console.log(action)
            //debugger
            //var _xml = this.xml_process.xmlUnit(action, record,[])
            var callback = this.url.parse('https://inventoryupdate.abebooks.com:10027');

            var api_agent = 'mislibros.bbdd.ovh'
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
                //body: _xml,
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
            //const _this = this
            mysql.query("SELECT * FROM books WHERE vendorListingid=?;SELECT Count(*) as counter from iberlibro WHERE vendorListingid=?",[vendorListingid,vendorListingid],function(err,_IberRecord){
                //debugger    
                _this.askFromService(_IberRecord[0],_IberRecord[1],price , callback)
            })

        },
        askFromService:function(books,counter,price, callback){
            var action = price>0? counter[0].counter ==0 ?'add':'update':'delete'                   
            books[0].price_quantity = price * 1
            
            this.post( this.xml_process.xmlUnit(action, books[0], []) , function(response){
                callback([books,counter],response)
            })
        },
        sendtohost: function (req, records, cb) {
            var cadsql = ''
            //var _this = this
            if (req.body.price_quantity != null || records[1][0].price_quantity!=null ) {
                var _price = req.body.price_quantity != null ? (req.body.price_quantity * 1) : records[1][0].price_quantity
                if (_price * 1 > 0) {
                    cadsql = "INSERT INTO iberlibro (vendorListingid,price_quantity,fecha_add) VALUES (?,?,NOW())  ON DUPLICATE KEY UPDATE price_quantity=?"
                    records[3][0].counter = 1
                } else {
                    cadsql = "DELETE FROM iberlibro WHERE vendorListingid=?"
                    records[3][0].counter = 0
                }
                var params = [records[1][0].vendorListingid, _price, _price]
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
            //var _this = this
            debugger
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
        },
        delete: function (e, array, cb) {
            //const _this = this
            const cadsql = "delete FROM iberlibro WHERE vendorListingid=?"
            console.log(array, e)
            if (_.isArray(array))
                if (array.length <= e)
                    cb()

            if ((_.isArray(array) ? array[e].code._text == "600" : array.code._text == "600") ) {
                mysql.query(cadsql, [_.isArray(array) ? array[e].vendorBookID._text.split("-")[0] : array.vendorBookID._text], function (err, records) {
                    if (_.isArray(array) ? e < (array.length-1): false) {
                        _this.delete(e+1, array, cb)
                    } else {
                        cb()
                    }
                })
            } else {
                console.log(array[e])
                _this.delete(e+1, array, cb)
            }
        },
        create: function (e, array, cb) {
            if ((_.isArray(array) ? array[e].code._text == "600" : array.code._text == "600")) {
                var cadsql = "SELECT * FROM books WHERE vendorListingid=?"
                mysql.query(cadsql, [_.isArray(array) ? array[e].vendorBookID._text : array.vendorBookID._text], function (err, _IberRecord) {
                   
                    if (_IberRecord[0].price_quantity > 0) {
                        cadsql = "INSERT INTO iberlibro (vendorListingid,price_quantity,fecha_add) VALUES (?,?,NOW())  ON DUPLICATE KEY UPDATE price_quantity=?"

                        var params = [_IberRecord[0].vendorListingid, _IberRecord[0].price_quantity, _IberRecord[0].price_quantity]

                        mysql.query(cadsql, params, function (err, records) {
                            if (_.isArray(array) ? e < array.length-1 : false) {
                                _this.create(e + 1, array, cb)
                            } else {
                                cb()
                            }
                        })
                    } else {
                        _this.create(e + 1, array, cb)
                    }
                })
            } else {
                debugger
                _this.create(e + 1, array, cb)
            }
        },
        xml: {
            bulk: function (add, del, req, res, _cb ) {
                var _e = req.query.e * 1
                var _l = req.query.l * 1
                var _p = req.query.p * 1
                var _t = (req.query.t * 1)+1
                var lapsus = req.query.lap * 1

                var populate = function (_e,_l,_t, record, cb) {

                    console.log(record.vendorListingid)
                    if (_t == 1)
                        _this.xml_process.file = _this.xml_process.functions().header()
                    if (_e < _l) {
                        if (del)
                            _this.xml_process.file += _this.xml_process.functions().action.delete(record)
                        if (add)
                            _this.xml_process.file += _this.xml_process.functions().action.add(record, [])

                    }
                    cb()
                }
                var cadsql = "SELECT (@cnt := @cnt + 1) AS rowNumber, libro.* FROM " + (add ? 'books' : 'iberlibro') + " as t  CROSS JOIN (SELECT @cnt := 0) AS dummy LEFT JOIN books as libro ON t.vendorListingid=libro.vendorListingid " + (add ?" where isnull(libro._dateSale) and length(libro._loc)>0 ":" ORDER by fecha_add asc ")+ " LIMIT " + (add ? _e : (_t-1) ) + "," + _p
                mysql.query(cadsql, function (err, records) {

                    if (err)
                        console.log(err,cadsql)

                    //console.log(records[0])
                    if (records.length > 0) {
                        populate(_e, _l, _t, records[0], function () {
                            if (_t == _p) {
                                _this.xml_process.file += _this.xml_process.functions().footer()

                                _this.xml_process.file = _this.xml_process.iconv.encode(_this.xml_process.file, 'iso-8859-1')


                                _this.post(_this.xml_process.file , function (response) {
                                    if (response.inventoryUpdateResponse) {
                                        _this[add ? 'create' : 'delete'](0, response.inventoryUpdateResponse.AbebookList.Abebook, function () {
                                            _this.xml_process.file = ""
                                            _cb({ lapsus: lapsus ? lapsus:60000 , next: _e < _l, e: _e + 1, t: 0 })
                                        })
                                    } else {
                                        var fs = require("fs")
                                        fs.writeFile('/error.xml', _this.xml_process.file, function () {
                                            debugger
                                            _cb({ next: _e < _l, e: _e + 1, t: _t  })
                                        })
                                        
                                    }
                                })
                            } else {
                                var resp = { next: _e < _l, e: _e + 1, t: _t  }
                                _cb(resp)
                            }
                        })


                        
                        

                    } else {
                        if (_this.xml_process.file.length > 0) {
                            _this.xml_process.file += _this.xml_process.functions().footer()

                            _this.post(_this.xml_process.file, function (response) {
                                if (response.inventoryUpdateResponse) {
                                    _this[add ? 'create' : 'delete'](0, response.inventoryUpdateResponse.AbebookList.Abebook, function () {
                                        _cb(response)
                                    })
                                } else {
                                    var fs = require("fs")
                                    fs.writeFile('/error.xml', _this.xml_process.file, function () {
                                        debugger
                                        _cb({ next: _e < _l, e: _e + 1, t: _t })
                                    })

                                }
                            })
                        } else {
                            _cb({ next:false })
                        }
                    }
                })
            }
        }
    }
    return _this
}