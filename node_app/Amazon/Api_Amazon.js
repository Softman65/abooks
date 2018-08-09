module.exports = function (mysql, apiKey, apiUser) {
    console.log('Amazon Api login')
    console.log(apiKey, apiUser)
    return {
        xml_process: require('./xml_Amazon.js')(apiKey, apiUser),
        https: require('https'), // https server
        http: require('http'), // http server
        querystring: require('querystring'),
        url: require('url'), // url parser 
        convert: require('xml-js'),

        post: function (record, action, _cb) {
            _cb({})
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