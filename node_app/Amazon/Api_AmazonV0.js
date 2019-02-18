module.exports = function (_, mysql, apiKey, apiUser) {
    console.log('Amazon Api login')
    console.log(apiKey, apiUser)

    function ISODateString(d) {
        function pad(n) { return n < 10 ? '0' + n : n }
        return d.getUTCFullYear() + '-'
            + pad(d.getUTCMonth() + 1) + '-'
            + pad(d.getUTCDate()) + 'T'
            + pad(d.getUTCHours()) + ':'
            + pad(d.getUTCMinutes()) + ':'
            + pad(d.getUTCSeconds()) + 'Z'
    }


    return {
        amazon:{
            sharedSecret:'b7AUfc2vukhERnc+pxvPaJs+C8tw/rbAdIs9qghn',
            AWSAccessKeyId:'AKIAJLW2QPKBWGO23JPA',
            MWSAuthToken:'amzn.mws.9ab28784-5d49-28b4-0ecd-6299ab453f1f',
            SellerId: 'A1CO8LVX9DCHB6'
        },
        xml_process: require('./xml_Amazon.js')(apiKey, apiUser),
        https: require('https'), // https server
        http: require('http'), // http server
        querystring: require('querystring'),
        url: require('url'), // url parser 
        convert: require('xml-js'),
        encode : require('encode-3986'),
        crypto: require('crypto'),
        canonical:function(site, url, params ){
            var that = this
            var str_params = ''
            _.each(params.sort(), function(e){
                var p = e.split("=")
                str_params = str_params + (str_params.length > 0 ? "&" : "") + p[0] + "=" + p[1]
            })
            var cadena = "POST\n" +
             site + "\n" +
             url + "\n" +
             str_params + "\n"

            return {post:cadena, params:str_params}

        },
        hash: function (str, secretKey) {
            return  this.crypto.createHmac('sha256', secretKey).update(str).digest('Base64') ;
        },
        post: function( _xml , _cb){
            //console.log(action)
            //debugger
            //var _xml = this.xml_process.xmlUnit(action, record,[])

            
            var that = this
            var t={
                ES:	'A1RKKUPIHCS9HS',
                GB:	'A1F83G8C2ARO7P',
                FR: 'A13V1IB3VIYZZH',
                DE:	'A1PA6795UKMFR9',
                IT:	'APJ6JRA9NG5V4'
            }
            var site_name = 'mws-eu.amazonservices.com';
            var url = 'https://' + site_name
            var MD5Value = that.xml_process.functions.Encode_3986(that.crypto.createHash('md5').update(_xml).digest("base64"))
            console.log('*******************')
            console.log(MD5Value)
            console.log('*******************')
            // = 'mws-eu.amazonservices.com';
            var params= ['AWSAccessKeyId=' + this.amazon.AWSAccessKeyId ,
                        'Action=SubmitFeed' ,
                        'ContentMD5Value=' + MD5Value,
                        'FeedType=_POST_PRODUCT_DATA_' ,
                        'MWSAuthToken=' + this.amazon.MWSAuthToken,

                        'MarketplaceIdList.Id.1=' + t.ES,  // españa
                 //       'MarketplaceIdList.Id.2=' + t.GB,  // GB/UK
                 //       'MarketplaceIdList.Id.3= '+ t.FR,  // FR
                 //       'MarketplaceIdList.Id.4=' + t.DE,  // DE
                 //       'MarketplaceIdList.Id.5=' + t.IT,    //IT
                        'SellerId=' + this.amazon.SellerId ,
                        //'&Signature='+crypto.createHash('md5').update(_xml).digest("hex")+
                        'PurgeAndReplace=false',
                        'SignatureMethod=HmacSHA256',
                        'SignatureVersion=2',
                        'Timestamp=' + new Date().toISOString().slice(0, 19) + 'Z',
                        'Version=2009-01-01'
                        ]
            
            var canonic = this.canonical(site_name, '/', params)
            var signature = this.hash('POST\n' + site_name + '\n/\n' + canonic.params , this.amazon.sharedSecret)
            //params.push()
            debugger
            //canonic = this.canonical(site_name, '/', params)
            //canonic.params = canonic.params + "&Signature=" + signature
            console.log(_xml.toString())
            console.log('POST\n' + site_name + '\n/\n' + canonic.params + "&Signature=" + signature)
            var callback = this.url.parse(url + "?" + canonic.params + "&Signature=" + signature);

            var options = {
                host: callback.hostname,
                port: 443,
                path: callback.path,
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    'Content-Length': _xml.length,
                    'User-Agent': 'abooksDB/1.0 (Language=NodeJs/10.0.0; Platform=Linux/Debian)',
                    'Referer': callback.protocol + '//' + callback.hostname
                },
                //body: _xml.toString(),
                rejectUnauthorized : false
            }
            
           // protocol = this.https;
            
            debugger

            var request = this.https.request(options, function (response) {
                debugger
                //response.setEncoding('ISO-8859-1');
                var _cbresponse = ""
                response.on('data', function (cbresponse) {
                    _cbresponse+= cbresponse
                    //debugger
                });
                response.on('end', function () {
                    var _jsonResponse = that.convert.xml2js(_cbresponse.toString(), { compact: true })

                    console.log('***********************')
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
            console.log(_xml.toString())
            request.write(_xml);
            request.end();
        },
        askToDb: function (vendorListingid, prices, callback) {
            const _this = this
            mysql.query("SELECT * FROM books WHERE vendorListingid=?;SELECT Count(*) as counter from amazon WHERE vendorListingid=?", [vendorListingid, vendorListingid], function (err, _IberRecord) {
                //debugger    
                _this.askFromService(_IberRecord[0], _IberRecord[1], prices, callback)
            })

        },
        askFromService: function (books, counter, prices, callback) {
            var price = 0
            _.each(prices, function (p, e) {
                if (!_.isNull(p) && !_.isNaN(p) && _.isNumber(p*1)) {
                    //prices[e] = p * 1
                    price = price + (p * 1)
                //} else {
                   // prices.splice(e,1)
                }
            })
            var action = price > 0 ? counter[0].counter == 0 ? 'add' : 'update' : 'delete'
            if (action != 'delete')
                books[0].prices = { ES: prices[0], UK: prices[1], FR: prices[2], DE: prices[3], IT: prices[4]} 
            //debugger
            var xml_Product = this.xml_process.xmlProducts(this.amazon.SellerId, action, books)
            console.log(xml_Product)
            this.post(xml_Product, function (response) {
                callback([books, counter], response)
            })


            //this.post(books[0], action, function (response) {
            //    callback([books, counter], response)
            //})
        },
        sendtohost: function (req, records, cb) {
            var cadsql = ''
            var _this = this
            if (req.body.price_quantity != null) {
                if (req.body.price_quantity * 1 > 0) {
                    var cadsql = "INSERT INTO amazon (vendorListingid,price_quantity_ES,price_quantity_UK,price_quantity_FR,price_quantity_DE,price_quantity_IT) VALUES (?,?,?,?,?,?)  ON DUPLICATE KEY UPDATE price_quantity_ES=?,price_quantity_UK=?,price_quantity_FR=?,price_quantity_DE=?,price_quantity_IT=?"
                    var params = [req.query.vendorListingid,
                    req.body.price_quantity_ES,
                    req.body.price_quantity_UK,
                    req.body.price_quantity_FR,
                    req.body.price_quantity_DE,
                    req.body.price_quantity_IT,
                    req.body.price_quantity_ES,
                    req.body.price_quantity_UK,
                    req.body.price_quantity_FR,
                    req.body.price_quantity_DE,
                    req.body.price_quantity_IT]

                    records[3][0].counter = 1
                } else {
                    var params = [req.query.vendorListingid]
                    cadsql = "DELETE FROM amazon WHERE vendorListingid=?"
                    records[3][0].counter = 0
                }
                
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
        form: function (req, cb) {
            //debugger
            this.askToDb(req.query.vendorListingid, [req.body.price_quantity_ES * 1, req.body.price_quantity_UK * 1, req.body.price_quantity_FR * 1, req.body.price_quantity_DE * 1, req.body.price_quantity_IT * 1] , function (_IberRecord, response) {
                if (_IberRecord[0][0].price_quantity_ES > 0) {
                    var cadsql = "INSERT INTO amazon (vendorListingid,price_quantity_ES,price_quantity_UK,price_quantity_FR,price_quantity_DE,price_quantity_IT) VALUES (?,?,?,?,?,?)  ON DUPLICATE KEY UPDATE price_quantity_ES=?,price_quantity_UK=?,price_quantity_FR=?,price_quantity_DE=?,price_quantity_IT=?"
                } else {
                    var cadsql = "DELETE FROM amazon WHERE vendorListingid=?"
                }
                var params = [req.query.vendorListingid,
                                req.body.price_quantity_ES,
                                req.body.price_quantity_UK,
                                req.body.price_quantity_FR,
                                req.body.price_quantity_DE,
                                req.body.price_quantity_IT,
                                req.body.price_quantity_ES,
                                req.body.price_quantity_UK,
                                req.body.price_quantity_FR,
                                req.body.price_quantity_DE,
                    req.body.price_quantity_IT]

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