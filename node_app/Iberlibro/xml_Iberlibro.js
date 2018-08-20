
module.exports = function (apiKey,apiUser) {
    var _ = require('lodash');
    var _v = function(e){
        return e!=null
    }

    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    var newLine = String.fromCharCode(10) + String.fromCharCode(13) // "Before "+ "%0D%0A"

    return {
 //       xmlIberbooks: {
            iconv : require('iconv-lite'),
            file:"",
            xmlUnit: function (action, libro, imagenes) {
                var xml = this.functions().header(this.apiUser, this.apiKey)
                if (action == 'update' || action == 'delete') {
                    xml += this.functions().action.delete(libro)
                }
                if (libro.vendorListingid.length > 0 && (action == 'update' || action == 'add')) {
                    xml += this.functions().action.add(libro, imagenes)
                }
                xml += this.functions().footer()
                return this.iconv.encode(xml, 'iso-8859-1'); //xmlRecord
            },
            functions: function () {
                return {
                    header: function () {
                        var xmlRecord = '<?xml version="1.0" encoding="ISO-8859-1"?>' + newLine
                        xmlRecord += '<inventoryUpdateRequest version="1.0">' + newLine
                        xmlRecord += '<action name="bookupdate">' + newLine
                        xmlRecord += '<username>' + apiUser + '</username>' + newLine
                        xmlRecord += '<password>' + apiKey + '</password>' + newLine
                        xmlRecord += '</action>' + newLine
                        xmlRecord += '<AbebookList>' + newLine
                        return xmlRecord
                    },
                    action: {
                        delete: function (libro) {
                            var xmlRecord = '<Abebook>' + newLine
                            xmlRecord += '<transactionType>delete</transactionType>' + newLine
                            xmlRecord += (_v(libro.vendorListingid) ? '<vendorBookID>' + libro.vendorListingid + "-" + libro._loc + '</vendorBookID>' : '') + newLine
                            xmlRecord += '</Abebook>' + newLine
                            return xmlRecord
                        },
                        add: function (libro, imagenes) {
                            var normalize = function (Str) {
                                if (Str.indexOf('&endash;') > -1)
                                    debugger

                                Str = Str.replaceAll('/', '\/')
                                Str = Str.replaceAll('&endash;', "\/")
                                Str = Str.replaceAll('&amp;', "&")
                                Str = Str.replace(/&\b/g, '\/')
                                Str = Str.replace(/&\B/g, "&amp;")
                                return Str
                            }
                            var xmlRecord = '<Abebook>' + newLine
                            xmlRecord += '<transactionType>add</transactionType>' + newLine
                            xmlRecord += (_v(libro.vendorListingid) ? '<vendorBookID>' + libro.vendorListingid+"-"+libro._loc + '</vendorBookID>' : '') + newLine
                            xmlRecord += (_v(libro.title) ? '<title>' + normalize(libro.title) + '</title>' : '') + newLine
                            xmlRecord += (_v(libro.author) ? '<author>' + normalize(libro.author) + '</author>' : '') + newLine
                            xmlRecord += (_v(libro.publisherName) ? '<publisher>' + normalize(libro.publisherName) + '</publisher>' : '') + newLine
                            xmlRecord += (_v(libro.subject) ? '<subject>' + normalize(libro.subject) + '</subject>' : '') + newLine
                            xmlRecord += (_v(libro.price_currency) ? '<price currency="' + libro.price_currency + '">' + libro.price_quantity + '</price>' : '') + newLine
                            xmlRecord += (_v(libro.bindingText) ? '<binding>' + libro.bindingText + '</binding>' : '') + newLine
                            xmlRecord += (_v(libro.description) ? '<description>' + normalize(libro.description) + '</description>' : '') + newLine
                            xmlRecord += (_v(libro.bookCondition) ? '<bookCondition>' + libro.bookCondition + '</bookCondition>' : '') + newLine
                            xmlRecord += (_v(libro.jacketCondition) ? '<jacketCondition>' + libro.jacketCondition + '</jacketCondition>' : '') + newLine
                            xmlRecord += (_v(libro.universalIdentifier_number) ? '<isbn>' + libro.universalIdentifier_number + '</isbn>' : '') + newLine
                            xmlRecord += (_v(libro.publishPlace) ? '<publishPlace>' + libro.publishPlace + '</publishPlace>' : '') + newLine
                            xmlRecord += (_v(libro.publishYear) ? '<publishYear>' + libro.publishYear + '</publishYear>' : '') + newLine
                            xmlRecord += (_v(libro.edition) ? '<edition>' + libro.publishYear + '</edition>' : '') + newLine
                            xmlRecord += '<quantity  amount="1"></quantity>' + newLine
                            //debugger
                            if (imagenes.length > 0) {
                                xmlRecord += '<pictureList>' + newLine
                                _.each(imagenes, function (_rPictures) {
                                    xmlRecord += '<pictureURL>' + _rPictures.idpictures + '.jpg<pictureURL>' + newLine
                                })
                                xmlRecord += '</pictureList>' + newLine
                            }
                            xmlRecord += '</Abebook>' + newLine
                            return xmlRecord
                        }
                    },
                    footer: function () {
                        var xmlRecord = '</AbebookList>' + newLine
                        xmlRecord += '</inventoryUpdateRequest>' + newLine
                        return xmlRecord
                    }
                }
            }

      // }

    }
}