module.exports = function (mysql,_,cred) {
   
    console.log('Books Api login')
    //console.log(apiKey, apiUser)
    return {
        fileXml:"",
        iberlibro : require('./Iberlibro/Api_Iberlibro.js')(_ , mysql.connection, cred[0].IberLibro_apiKey, cred[0].IberLibro_apiUser),
        amazon : require('./Amazon/Api_Amazon.js')(_ , mysql.connection, cred[0].IberLibro_apiKey, cred[0].IberLibro_apiUser),
        new: function (req,cb) {
            var _this = this
            var cadsql = "INSERT INTO books ("
            var cadval = ""
            var counter = 0
            var params = []

            _.each(req.body, function (value, key) {
                counter++
                if (key.substr(0, 1) != "_") {
                    cadsql = cadsql + (counter > 1 ? ',' : '') + key
                    cadval = cadval + (counter > 1 ? ',?' : '?')
                    params.push(value)
                }
            })
            cadsql = cadsql + ") VALUES (" + cadval + ")"
            debugger
            mysql.connection.query(cadsql, params, function (err, records) {
                debugger
                if (err)
                    debugger

                req.query.vendorListingid = "000000".substr(0,6-(records.insertId+"").length) + records.insertId
                _this.form(req, function (err, record) {
                    
                    cb(err, records)
                })

            })
        },
        imageSave: function (req,cb) {
            var cadsql = "call saveImageBook(?,?)"
            mysql.connection.query(cadsql, [req.query.vendorListingid, req.body.image], function (err, record) {
                cb(err, record)
            })
        },
        key: function (req, cb)  {
            var cadsql = "SELECT count(*) as total FROM books WHERE vendorListingid= " + req.query.value
            mysql.connection.query(cadsql, function (err, records) {
                cb(err,records)
            })
        },
        img: function (req, cb) {
            var cadsql = "SELECT image FROM pictures WHERE vendorListingid= " + req.query.ref
            mysql.connection.query(cadsql, function (err, records) {
                cb(err, records)
            })
        },
        totales: function (req, cb) {
            var cadsql = "SELECT * from contadores"
            mysql.connection.query(cadsql, function (err, records) {
                cb(err, records)
            }) 
        },
        sale: function (reg, cb) {
            var iberlibro = this.iberlibro
            if (reg.body.loc.length>0) {
                iberlibro.xml_process.file = iberlibro.xml_process.functions().header()
                iberlibro.xml_process.file += iberlibro.xml_process.functions().action.delete({ vendorListingid: reg.body.id + "-" + reg.body.loc })
                iberlibro.xml_process.file += iberlibro.xml_process.functions().footer()
            }
            debugger
            cadsql = "DELETE FROM iberlibro WHERE vendorListingid=?;DELETE FROM iberlibro WHERE vendorListingid=?;UPDATE books SET _sale=?,_dateSale=now() WHERE  vendorListingid=?;"
            mysql.connection.query(cadsql, [reg.body.id, reg.body.id, reg.body.code, reg.body.id], function (err, records) {
                if (err)
                    debugger
                if (reg.body.loc.length > 0) {
                    iberlibro.post(iberlibro.xml_process.file, function (response) {
                        cb({}, response)
                    })
                } else {
                    cb({}, {})
                }
            })
        },
        total: function (req, cb) {
            mysql.connection.query("SELECT count(*) as total FROM books ", function (err, records) {
                //debugger
                records[0].pages = cint(records[0].total / req.query.elems)
                records[0].elemsperpage = req.query.elems * 1
                cb(err,records)
                //debugger
                //res.send('hi')
            })
        },
        tables: function (req,cb) {
            mysql.connection.query("SELECT DISTINCT name FROM iberTables; SELECT * FROM iberTables order by name,Description asc", function (err, records) {
                cb(err,records);
            })
        },
        page: function (req, cb) {
            var order = ""
            var filter = ""
            var from = ""
            var join = ""
            var fields = ""
            const _fields = function () {
                const arr = [`title`, `author`, `publisherName`,
                    `publishYear`,
                    `publishPlace`,
                    `publishYearText`,
                    `description`,
                    `productType`,
                    `edition`,
                    `bookCondition`,
                    `inscriptionType`,
                    `bindingText`,
                    `jacketCondition`,
                    `universalIdentifier_number`,
                    `buyerSearchAttribute`,
                    `_loc`,
                    `_sale`,
                    `_dateSale`,
                    `subject`]
                return arr.join(",")
            }
            order = " ORDER BY books.vendorListingid desc"
            if (req.query.sortField != null)
                order = " ORDER BY " + req.query.sortField + " " + req.query.sortOrder

            if (req.query.title.length > 0)
                filter = filter + (filter.length == 0 ? " WHERE " : "") + "title LIKE '%" + req.query.title + "%' "

            if (req.query.author.length > 0)
                filter = filter + (filter.length == 0 ? " WHERE " : " AND ") + "author LIKE '%" + req.query.author + "%' "

            if (req.query._loc.length > 0)
                filter = filter + (filter.length == 0 ? " WHERE " : " AND ") + "_Loc LIKE '" + req.query._loc + "%' "

            if (req.query._sale.length > 0)
                filter = filter + (filter.length == 0 ? " WHERE " : " AND ") + "_Sale LIKE '" + req.query._sale + "%' "

            if (req.query.price_quantity.length > 0)
                filter = filter + (filter.length == 0 ? " WHERE " : " AND ") + "price_quantity = '" + req.query.price_quantity + "' "

            if (req.query.vendorListingid.length > 0)
                filter = filter + (filter.length == 0 ? " WHERE " : " AND ") + "books.vendorListingid = '" + req.query.vendorListingid + "' "

            if (req.query.type == 'all') {
                from = "FROM books "
                join = "FROM books LEFT JOIN pictures on pictures.vendorListingid = books.vendorListingid  LEFT JOIN iberlibro on iberlibro.vendorListingid = books.vendorListingid LEFT JOIN amazon on amazon.vendorListingid = books.vendorListingid"
                fields = _fields() + ',books.vendorListingid,books.price_quantity,iberlibro.price_quantity as price_quantity_Iberlibro,amazon.price_quantity_ES,amazon.price_quantity_DE,amazon.price_quantity_FR,amazon.price_quantity_IT,amazon.price_quantity_UK ,pictures.image as img,(SELECT count(0) from iberlibro where iberlibro.vendorListingid = books.vendorListingid) as C_iberlibro ,(SELECT count(0) from amazon where amazon.vendorListingid = books.vendorListingid) as C_amazon , bookfinder '
            }

            if (req.query.type == 'iberlibro') {
                from = "FROM iberlibro "
                join = "FROM iberlibro LEFT JOIN books on iberlibro.vendorListingid = books.vendorListingid LEFT JOIN pictures on pictures.vendorListingid = books.vendorListingid "
                fields = _fields() + ',iberlibro.vendorListingid,books.price_quantity,iberlibro.price_quantity as price_quantity,books.bookfinder,pictures.image as img '
            }
            if (req.query.type == 'amazon') {
                from = "FROM amazon "
                join = "FROM amazon LEFT JOIN books on amazon.vendorListingid = books.vendorListingid LEFT JOIN pictures on pictures.vendorListingid = books.vendorListingid "
                fields = _fields() + ',amazon.vendorListingid,amazon.price_quantity_ES,amazon.price_quantity_DE,amazon.price_quantity_FR,amazon.price_quantity_IT,amazon.price_quantity_UK,books.bookfinder,pictures.image as img '
            }
            const _pageSize = req.query.pageSize != null ? req.query.pageSize : 10
            const _pageIndex = req.query.pageIndex != null ? req.query.pageIndex : 1
            var cadsql = "SELECT count(*) as total FROM books " + filter + ";SELECT count(*) as total FROM iberlibro LEFT JOIN books on iberlibro.vendorListingid = books.vendorListingid " + filter + ";SELECT count(*) as total FROM amazon LEFT JOIN books on amazon.vendorListingid = books.vendorListingid" + filter + ";SELECT " + (fields + join + filter + order) + (filter.length == 0 ? " LIMIT " + (_pageSize * (_pageIndex - 1)) + "," + _pageSize : '')
            console.log(req.query.type)
            console.log(cadsql)

            mysql.connection.query(cadsql, function (err, records) {
                if (err)
                    debugger
                cb(err, records, cadsql)
            })
        },

        form: function (req, cb) {

           var _this = this
            var cadsqlLast = "; SELECT *  FROM books WHERE vendorListingid=" + req.query.vendorListingid + ";SELECT * FROM pictures WHERE vendorListingid=" + req.query.vendorListingid + ";SELECT COUNT(*) as counter FROM iberlibro WHERE vendorListingid=" + req.query.vendorListingid
            var cadsql = "UPDATE books SET "
            var counter = 0
            var params = []
            var _iberlibro = false
            var _amazon = false

            _.each(req.body, function (value, key) {
                //debugger
                counter++
                if (key != '_iberlibro') {
                    if (key != '_amazon') {
                        cadsql = cadsql + (counter > 1 ? ',' : '') + key + "=?"
                        params.push(value)
                    } else {
                        _amazon = (value == 'on' ? true : false)
                    }
                } else {
                    _iberlibro = (value == 'on' ? true : false)
                }
            })
            //debugger
            mysql.connection.query(cadsql + " WHERE vendorListingid=" + req.query.vendorListingid + cadsqlLast, params, function (err, records) {
                if (err) {
                    debugger

                } else {
                    if (_iberlibro || _amazon) {
                        //iberlibro.askToDb(req.query.vendorListingid,req.body.price_quantity*1,function(_IberRecord,response){
                        if (_iberlibro) {

                            _this.iberlibro.sendtohost(req, records, function (err) {
                                var _err = { iberlibro: err }
                                if (_amazon) {
                                    _this.amazon.sendtohost(req, records, function (err) {
                                        _err.amazon = err
                                        cb(err, records);
                                        //res.json({ body: req.body, err: _err, records: records });
                                    })
                                } else {
                                    //res.json({ body: req.body, err: _err, records: records });
                                    cb(err, records);
                                }
                            })
                        } else {
                            _this.amazon.sendtohost(req, records, function (err) {
                                _err.amazon = err
                                cb(err, records);
                                //res.json({ body: req.body, err: _err, records: records });
                            })
                        }
                    } else {
                        cb(err, records);
                        //res.json({ body: req.body, err: err, records: records })
                    }
                }
                //if(records[3][0].counter)

                // res.json({body:req.body,err:err,records:records});
            })
        }
    }
}