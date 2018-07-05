module.exports = function () {

    return {
        apiKey : 'fcbe644dd3ba46a797be',
        https : require('https'), // https server
        http : require('http'), // http server
        querystring : require('querystring'),
        url : require('url'), // url parser 

        post: function(_url, xml_body){
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
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': xml_body.length,
                    'User-Agent': api_agent,
                    'Referer': callback.protocol + '//' + callback.hostname
                },
                rejectUnauthorized : false
            }
            
            protocol = this.https;

            var request = protocol.request(options, function (response) {
                response.setEncoding('utf8');
            
                response.on('data', function (cbresponse) {
                    console.log(cbresponse);
            
                });
            });
            
            request.on('error', function (e) {
                    console.log('problem with request: ');
                    console.log(e);
            });

            //write data to server
            request.write(xml_body);
            request.end();
        }
    }
}