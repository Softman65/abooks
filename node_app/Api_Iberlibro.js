module.exports = function () {

    return {
        xml_process : require('./xml_prepare.js')(),
        https : require('https'), // https server
        http : require('http'), // http server
        querystring : require('querystring'),
        url : require('url'), // url parser 
        convert : require('xml-js'),
        post: function(record, action, _cb){
            console.log(action)
            debugger
            var _xml = this.xml_process.xmlIberbooks(action, record,[])
            var callback = this.url.parse('https://inventoryupdate.abebooks.com:10027');

            var api_agent = 'abboks.bbdd.ovh'
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
                rejectUnauthorized : false
            }
            
            protocol = this.https;
            convert = this.convert;
            debugger

            var request = protocol.request(options, function (response) {
                //response.setEncoding('ISO-8859-1');
                var _cbresponse = ""
                response.on('data', function (cbresponse) {
                    _cbresponse+= cbresponse
                    debugger
                });
                response.on('end', function () {
                    var _jsonResponse = convert.xml2js(_cbresponse.toString(), {compact: true})
                    
                    console.log('response received:')
                    console.log( _cbresponse.toString() );
                    console.log('***********************')
                    console.log( _jsonResponse );
                    console.log('***********************')
                    _cb(_jsonResponse)
                    debugger
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
            mysql.connection.query("SELECT * FROM books WHERE vendorListingid=?;SELECT Count(*) as counter from iberlibro WHERE vendorListingid=?",[vendorListingid,vendorListingid],function(err,_IberRecord){
                    
                var action = price>0?_IberRecord[1][0].counter>0?'add':'update':'delete'                   
                _IberRecord[0][0].price_quantity = price * 1
                console.log(action, _IberRecord[0][0].price_quantity)

                iberlibro.post( _IberRecord[0][0], action, function(response){
                    callback(_IberRecord,response)
                })
            })

        }
    }
}