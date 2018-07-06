module.exports = function () {

    return {
        xml_process : require('./xml_prepare.js')(),
        https : require('https'), // https server
        http : require('http'), // http server
        querystring : require('querystring'),
        url : require('url'), // url parser 
        convert : require('xml-js'),
        post: function(record, _cb){
           
            var _xml = this.xml_process.xmlIberbooks(record,[])
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
            
                response.on('data', function (cbresponse) {
                    var _jsonResponse = convert.xml2js(cbresponse.toString(), {compact: false})
                    
                    console.log('response received:')
                    console.log( cbresponse.toString() );
                    console.log('***********************')
                    console.log( _jsonResponse );
                    console.log('***********************')
                    cb(_jsonResponse)
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
        }
    }
}