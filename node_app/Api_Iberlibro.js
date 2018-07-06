module.exports = function () {

    return {
        xml_process : require('./xml_prepare.js')(),
        https : require('https'), // https server
        http : require('http'), // http server
        querystring : require('querystring'),
        url : require('url'), // url parser 

        post: function( _action, record){
           
            var _xml = this.xml_process.xmlIberbooks(record,[],_action)
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
            debugger
            var request = protocol.request(options, function (response) {
                response.setEncoding('utf8');
            
                response.on('data', function (cbresponse) {
                    debugger
                    console.log(cbresponse);
            
                });
            });
            
            request.on('error', function (e) {
                    debugger
                    console.log('problem with request: ');
                    console.log(e);
            });

            //write data to server
            request.write(_xml);
            request.end();
        }
    }
}