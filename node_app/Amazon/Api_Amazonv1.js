module.exports = function (_, mysql, apiKey, apiUser) {
    //**********************************************************************************
    //
    /*
     * Date Format 1.2.3
     * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
     * MIT license
     *
     * Includes enhancements by Scott Trenda <scott.trenda.net>
     * and Kris Kowal <cixar.com/~kris.kowal/>
     *
     * Accepts a date, a mask, or a date and a mask.
     * Returns a formatted version of the given date.
     * The date defaults to the current date/time.
     * The mask defaults to dateFormat.masks.default.
     */

    var dateFormat = function () {
        var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };

        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {
            var dF = dateFormat;

            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date;
            if (isNaN(date)) throw SyntaxError("invalid date");

            mask = String(dF.masks[mask] || mask || dF.masks["default"]);

            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }

            var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: pad(d),
                    ddd: dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: pad(m + 1),
                    mmm: dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: pad(H % 12 || 12),
                    H: H,
                    HH: pad(H),
                    M: M,
                    MM: pad(M),
                    s: s,
                    ss: pad(s),
                    l: pad(L, 3),
                    L: pad(L > 99 ? Math.round(L / 10) : L),
                    t: H < 12 ? "a" : "p",
                    tt: H < 12 ? "am" : "pm",
                    T: H < 12 ? "A" : "P",
                    TT: H < 12 ? "AM" : "PM",
                    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();

    // Some common format strings
    dateFormat.masks = {
        "default": "ddd mmm dd yyyy HH:MM:ss",
        shortDate: "m/d/yy",
        mediumDate: "mmm d, yyyy",
        longDate: "mmmm d, yyyy",
        fullDate: "dddd, mmmm d, yyyy",
        shortTime: "h:MM TT",
        mediumTime: "h:MM:ss TT",
        longTime: "h:MM:ss TT Z",
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

    // Internationalization strings
    dateFormat.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };

    // For convenience...
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };

   
    return {
        amazon: {
            endpoint: 'mws-eu.amazonservices.com',
            sharedSecret: 'b7AUfc2vukhERnc+pxvPaJs+C8tw/rbAdIs9qghn',
            AWSAccessKeyId: 'AKIAJLW2QPKBWGO23JPA',
            MWSAuthToken: 'amzn.mws.9ab28784-5d49-28b4-0ecd-6299ab453f1f',
            SellerId: 'A1CO8LVX9DCHB6',
            MarketPlaces: {
                ES: 'A1RKKUPIHCS9HS',
                GB: 'A1F83G8C2ARO7P',
                FR: 'A13V1IB3VIYZZH',
                DE: 'A1PA6795UKMFR9',
                IT: 'APJ6JRA9NG5V4'
            }
        },
        xml_process: require('./xml_Amazon.js')(apiKey, apiUser),
        https: require('https'), // https server
        http: require('http'), // http server
        querystring: require('querystring'),
        url: require('url'), // url parser 
        convert: require('xml-js'),
        encode: require('encode-3986'),
        crypto: require('crypto'),
        canonical: function (site, url, params) {
            var that = this
            var str_params = ''
            _.each(params.sort(), function (e) {
                var p = e.split("=")
                str_params = str_params + (str_params.length > 0 ? "&" : "") + p[0] + "=" + p[1]
            })
            var cadena = "POST\n" +
                site + "\n" +
                url + "\n" +
                str_params + "\n"

            return { post: cadena, params: str_params }

        },
        hash: function (str, secretKey) {
            return this.crypto.createHmac('sha256', secretKey).update(str).digest('Base64');
        },
        post: function (_xml, _cb) {
            var that = this
            //'Feeds', 'SubmitFeed', "_POST_PRODUCT_DATA_", {}, [], xml, cb
            this.PrepareRequest('Feeds', 'SubmitFeed', "_POST_PRODUCT_DATA_", this.amazon, [this.amazon.MarketPlaces.ES], _xml.toString(), function (options) {
                //*********************************
                var callback = that.url.parse(options.url)
                console.log('*********************************')
                console.log(callback.path)
                console.log('*********************************')
                console.log(options.nv)
                console.log('*********************************')

                var opts = {
                    host: callback.hostname,
                    port: 443,
                    path: callback.path,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/xml',
                        'Content-Length': _xml.length,
                        'User-Agent': options.userAgent, //'abooksDB/1.0 (Language=NodeJs/10.0.0; Platform=Linux/Debian)',
                        'x-amazon-user-agent': options.userAgent,
                        'Referer': callback.protocol + '//' + callback.hostname
                    },
                    rejectUnauthorized: false
                }
                var request = that.https.request(opts, function (response) {
                    //debugger
                    //response.setEncoding('ISO-8859-1');
                    var _cbresponse = ""
                    response.on('data', function (cbresponse) {
                        _cbresponse += cbresponse
                        //debugger
                    });
                    response.on('end', function () {
                        var _jsonResponse = that.convert.xml2js(_cbresponse.toString(), { compact: true })

                        console.log('***********************')
                        console.log('response received:')
                        console.log(_cbresponse.toString());
                        console.log('***********************')
                        console.log(_jsonResponse);
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
                console.log(options.data)
                request.write(options.data);
                request.end();
            })
            return;
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
                if (!_.isNull(p) && !_.isNaN(p) && _.isNumber(p * 1)) {
                    //prices[e] = p * 1
                    price = price + (p * 1)
                    //} else {
                    // prices.splice(e,1)
                }
            })
            var action = price > 0 ? counter[0].counter == 0 ? 'add' : 'update' : 'delete'
            if (action != 'delete')
                books[0].prices = { ES: prices[0], UK: prices[1], FR: prices[2], DE: prices[3], IT: prices[4] }
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
            this.askToDb(req.query.vendorListingid, [req.body.price_quantity_ES * 1, req.body.price_quantity_UK * 1, req.body.price_quantity_FR * 1, req.body.price_quantity_DE * 1, req.body.price_quantity_IT * 1], function (_IberRecord, response) {
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
        },
        PrepareRequest: function (apiSection, action, FeedType, AmazonData, MarketplaceIdList, feed, cb) {

            var apiCallOption = {
                Feeds: {
                    Name: 'feeds',
                    apiCalls: [
                        { Name: "FeedType", DisplayName: "Feed Type", Required: true },
                        { Name: "FeedOptions", DisplayName: "", Required: false },
                        { Name: "MarketplaceIdList.Id.-", DisplayName: "Marketplace ID", List: true, Required: false },
                        { Name: "PurgeAndReplace", DisplayName: "Purge and Replace", Required: false, Type: "Checkbox" }
                    ],
                    Path: '/'
                }
            }


            var apiGroup = apiCallOption[apiSection] //apiCallOption.data('apigroup');
            //var apiCall = apiGroup.apiCalls // apiCallOption.data('apicall');

            var PostedAction = action;

            if (!apiGroup) {
                cb({ error: true })
            }
            var apiPath = apiGroup['Path'];

            var endpoint = AmazonData.endpoint //$('#endpoint').attr('value');
            var merchantID = this.fn.urlEncode(AmazonData.SellerId);

            var awsAccountID = this.fn.urlEncode(AmazonData.AWSAccessKeyId);
            var authToken = this.fn.urlEncode(AmazonData.MWSAuthToken);
            var secretKey = AmazonData.sharedSecret.trim();

            var appName = 'ArteBooks' //$('#appName').attr('value');
            var appVersion = '1.0' //$('#appVersion').attr('value');


            var signatureVersion = '2' //$('#signatureVersion').attr('value');
            var signatureMethod = 'HmacSHA256' //$('#signatureMethod').attr('value');
            var apiVersion = '2009-01-01' //$('#apiVersion').attr('value');
            //var feed = $('#feed').attr('value');
            var feedType = '' //$('#feedType option:selected').text();
            var appLanguage = 'Javascript' //$('#appLanguage').attr('value');
            //apiPath = $('#request-path').attr('value');

            var userAgent = appName + '/' + appVersion + ' (Language=' + appLanguage + ')';
            var timestamp = '2018-09-28T19:00:38Z' //dateFormat(new Date(), 'isoUtcDateTime');
            //if (!$('#calcTimestamp').attr('checked')) timestamp = $('#mytimestamp').attr('value');

            //var contentMD5 = hex_md5(feed);
            var b64contentMD5 = this.crypto.createHash('md5').update(feed).digest("base64") //hexstr2b64(contentMD5);
            var encodedContentMD5 = this.fn.urlEncode(b64contentMD5);

            // some validation
            timestamp = this.fn.urlEncode(timestamp);

            var nv = new Array();
            nv['AWSAccessKeyId'] = awsAccountID;
            nv['Action'] = action;
            if (action == 'SubmitFeed') nv['ContentMD5Value'] = encodedContentMD5;
            nv['FeedType'] = FeedType

            if (authToken != '') {
                nv['MWSAuthToken'] = authToken;
            }
            _.each(MarketplaceIdList, function (v, i) {
                nv['MarketplaceIdList.Id.' + (i+1)] = v
            })            // Only legacy APIs say "Merchant"
            if (apiSection != 'Feeds' && apiSection != 'Reports') {
                nv['SellerId'] = merchantID;
            }
            else {
                nv['Merchant'] = merchantID;
            }
            nv['PurgeAndReplace'] = false;
            nv['SignatureMethod'] = signatureMethod;
            nv['SignatureVersion'] = signatureVersion;
            nv['Timestamp'] = timestamp;
            nv['Version'] = apiVersion;
            
            



            var stringToSign = "POST\n" + endpoint + "\n";
            stringToSign += apiPath + "\n";
            stringToSign += this.fn.createStringToSign(nv);


            //this.hash(stringToSign, secretKey)


            //var hmac = Crypto.HMAC(Crypto.SHA256, stringToSign, secretKey, { asString: false });

            //$('#stringToSign').html('<pre>' + formatPre(stringToSign.replace(/&/g, '&amp;')) + '</pre>');
            //$('#hmac').html(hmac);
            //POSTmws-eu.amazonservices.com/AWSAccessKeyId=AKIAJLW2QPKBWGO23JPA&Action=SubmitFeed&ContentMD5Value=stOCj%2Bjtkzh91Kj6Em%2BFHw%3D%3D&FeedType=_POST_PRODUCT_DATA_&MWSAuthToken=amzn.mws.9ab28784-5d49-28b4-0ecd-6299ab453f1f&MarketplaceIdList.Id.1=A1RKKUPIHCS9HS&Merchant=A1CO8LVX9DCHB6&PurgeAndReplace=false&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2018-09-28T19%3A00%3A38Z&Version=2009-01-01
            var b64hmac = this.hash(stringToSign, secretKey) //hexstr2b64(hmac);

            //var j = b64hmac.length % 4;
            //for (var i = 0; i < j; i++) b64hmac += '=';
            //$('#base64hmac').html(b64hmac);

            //$('#response').html('<img class="loading" />');

            //if (action == 'SubmitFeed') {
            //    $('#contentmd5').show();
            //    $('#contentmd5header').show();
            //    $('#contentmd5b64header').show();
            //    $('#contentmd5b64').show();
            //}

            var queryString = "AWSAccessKeyId=" + awsAccountID + "&Action=" + action;
            if (action == 'SubmitFeed') queryString += "&ContentMD5Value=" + encodedContentMD5;
            queryString += "&FeedType=" + FeedType;
            if (authToken != '') queryString += "&MWSAuthToken=" + authToken;
            _.each(MarketplaceIdList, function (v, i) {
                queryString += "&MarketplaceIdList.Id." + (i + 1) + "=" + v
            })
            // only legacy APIs say Merchant, newer ones user SellerId
            if (apiSection != 'Feeds' && apiSection != 'Reports') queryString += "&SellerId=" + merchantID;
            else queryString += "&Merchant=" + merchantID;
            queryString += "&PurgeAndReplace=true"; 
            queryString += "&SignatureMethod=HmacSHA256";
            queryString += "&SignatureVersion=2";
            queryString += "&Timestamp=" + timestamp;
            queryString += "&Version=" + apiVersion;
            queryString += "&Signature=" + this.fn.urlEncode(b64hmac);
            







            if (action == 'SubmitFeed') {
                cb({
                    url: 'https://' + endpoint + apiPath + '?' + queryString,
                    stringToSign: stringToSign,
                    b64hmac: b64hmac,
                    data: feed,
                    dataType: 'text',
                    type: 'POST',
                    contentType: 'text/xml',
                    userAgent: userAgent,
                    nv:nv
                });
            } else {
                cb({
                    url: 'https://' + endpoint + apiPath,
                    data: queryString,
                    dataType: 'text',
                    type: 'POST',
                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                    userAgent: userAgent,
                    nv: nv
                });
            }

        },
        fn: {
            createStringToSign: function (nameValues) {
                var keys = [];
                for (var k in nameValues) keys.push(k);
                var str = '';

                keys = keys.sort();

                for (var i = 0; i < keys.length; i++) {
                    if (i != 0) str += '&';
                    str += keys[i] + '=' + nameValues[keys[i]];
                }

                return str;
            },
            /* Performs URL encoding compatible with MWS http requests */
            urlEncode: function (str) {
                str = encodeURIComponent(str);
                str = str.replace(/\*/g, '%2A');
                str = str.replace(/\(/g, '%28');
                str = str.replace(/\)/g, '%29');
                str = str.replace(/'/g, '%27');
                str = str.replace(/\!/g, '%21');
                return str;
            }

        }

    }

}