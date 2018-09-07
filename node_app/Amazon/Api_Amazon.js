module.exports = function (_, mysql, apiKey, apiUser) {
    console.log('Amazon Api login')
    console.log(apiKey, apiUser)
    return {
        amazon:{
            sharedSecret:'',
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
                str_params = str_params +(str_params.length>0?"&":"")+ p[0]+"="+that.encode(p[1])
            })
            var cadena = "POST\n" +
             site + "\n" +
             url + "\n" +
             str_params + "\n"

            return {post:cadena, params:str_params}

        },
        hash:function(str, secretKey){
            crypto.createHmac('sha256', secretKey).update(str).digest('base64');
        },
        post: function( marketplaces ,_xml , _cb){
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
            // = 'mws-eu.amazonservices.com';
            var params= ['AWSAccessKeyId=' + this.amazon.AWSAccessKeyId ,
                        'Action=SubmitFeed' ,
                        'ContentMD5Value=' +  crypto.createHash('md5').update(data).digest("hex"),
                        'FeedType=_POST_PRODUCT_DATA_' ,
                        'MWSAuthToken=' + this.amazon.MWSAuthToken,

                        'MarketplaceIdList.Id.1=A1RKKUPIHCS9HS',  // españa
                        'MarketplaceIdList.Id.2=A1F83G8C2ARO7P',  // GB/UK
                        'MarketplaceIdList.Id.3=A13V1IB3VIYZZH',  // FR
                        'MarketplaceIdList.Id.4=A1PA6795UKMFR9',  // DE
                        'MarketplaceIdList.Id.5=APJ6JRA9NG5V4',    //IT
                        'SellerId=' + this.amazon.SellerId ,
                        //'&Signature='+crypto.createHash('md5').update(_xml).digest("hex")+
                        'SignatureMethod=HmacSHA256',
                        'SignatureVersion=2',
                        'Timestamp='+ new Date().toISOString(),
                        'Version=2009-01-01']
            
            var canonic = this.canonical(site_name, '/Feeds/2009-01-01' ,params)
            canonic.params = canonic.params + "&Signature=" + this.hash(canonic.post,this.amazon.sharedSecret)

            var callback = this.url.parse(url+"?"+canonic.params);

            var options = {
                host: callback.hostname,
                port: callback.port,
                path: callback.path,
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    'Content-Length': _xml.length,
                    'User-Agent': 'abooksDB/1.0 (Language=NodeJs/10.0.0; Platform=Linux/Debian)',
                    'Referer': callback.protocol + '//' + callback.hostname
                },
                //body: _xml,
                rejectUnauthorized : false
            }
            
           // protocol = this.https;
            
            debugger

            var request = this.https.request(options, function (response) {
                //response.setEncoding('ISO-8859-1');
                var _cbresponse = ""
                response.on('data', function (cbresponse) {
                    _cbresponse+= cbresponse
                    //debugger
                });
                response.on('end', function () {
                    var _jsonResponse = that.convert.xml2js(_cbresponse.toString(), {compact: true})
                    
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
        askFromService: function (books, counter, price, callback) {
            var action = price > 0 ? counter[0].counter == 0 ? 'add' : 'update' : 'delete'
            books[0].price_quantity = price * 1

            this.post(books[0], action, function (response) {
                callback([books, counter], response)
            })
        },
        sendtohost: function (req, records, cb) {
            var cadsql = ''
            var _this = this
            if (req.body.price_quantity != null) {
                if (req.body.price_quantity * 1 > 0) {
                    var cadsql = "INSERT INTO amazon (vendorListingid,price_quantity_ES,price_quantity_UK,price_quantity_FR,price_quantity_DE,price_quantity_IT) VALUES (?,?,?,?,?,?)  ON DUPLICATE KEY UPDATE price_quantity_ES=?,price_quantity_UK=?,price_quantity_FR=?,price_quantity_DE=?,price_quantity_IT=?"
                    var params = [req.query.vendorListingid,
                    req.body.price_quantityS,
                    req.body.price_quantity,
                    req.body.price_quantity,
                    req.body.price_quantity,
                    req.body.price_quantity,
                    req.body.price_quantity,
                    req.body.price_quantity,
                    req.body.price_quantity,
                    req.body.price_quantity,
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
        form: function (req, records,cb) {
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

            mysql.query(cadsql, params, function (err, records) {
                if (err)
                    debugger
                cb(err,records)
                
            })
        }
    }
}