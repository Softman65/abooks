
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);;
};

module.exports = function (apiKey,apiUser) {
    var _ = require('lodash');
    var _v = function(e){
        return e!=null
    }

    var newLine= ''//String.fromCharCode(10) + String.fromCharCode(13) // "Before "+ "%0D%0A"
    return { 
        iconv: require('iconv-lite'),
        xmlProducts: function (MerchantIdentifier,action, libros) {
            var xml = this.xmlAmazon.constructor(MerchantIdentifier, action, libros)
            return this.iconv.encode(xml, 'iso-8859-1'); //xmlRecord
        },      
        xmlAmazon:  {
                    constructor:function(MerchantIdentifier,operation,libros){
                        var xmlRecord = this.header(MerchantIdentifier)
                        xmlRecord += this.Message.constructor(operation,libros)
                        xmlRecord += this.footer()
                        return xmlRecord
                    },
                    header : function(MerchantIdentifier){
                        var xmlRecord = '<?xml version="1.0" encoding="ISO-8859-1"?>' + newLine
                        xmlRecord += '<AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="amzn-envelope.xsd">' + newLine
                        xmlRecord += '<Header>' + newLine
                        xmlRecord += '<DocumentVersion>1.01</DocumentVersion>' + newLine
                        xmlRecord += '<MerchantIdentifier>'+ MerchantIdentifier+'</MerchantIdentifier>' + newLine
                        xmlRecord += '</Header>' + newLine
                        xmlRecord += '<MessageType>Product</MessageType>' + newLine
                        xmlRecord += '<PurgeAndReplace>false</PurgeAndReplace>' + newLine
                        return xmlRecord
                    },
                    Message : {
                        converters:{ 
                            ConditionType : function(_c){
                                
                                var _out = ['Aceptable',
                                    'Bueno',
                                    'Muy Bueno',
                                    'Como Nuevo',
                                    'Como Nuevo','Muy Bueno','Muy Bueno','Nuevo','Muy Bueno','Muy Bueno','Muy Bueno','Muy Bueno','Muy Bueno','Muy Bueno','Muy Bueno','Muy Bueno','Muy Bueno','Muy Bueno']
                                var _in = ['Bien','Buen estado','Casi nuevo','Como nuevo','Excelente','excelente estado','Libro Nuevo',
                                        'Muy bien',
                                        'Muy buen estado',
                                        'Muy bueno',
                                        'Nueva',
                                        'Nueva cubierta',
                                        'Nueva sobrecubierta',
                                        'nuevas cubiertas',
                                        'Nuevo',
                                        'Nuevo',
                                        'Perfecto']
                                return _in.indexOf(_c)>-1?_out[_in.indexOf(_c)]:''
                            }
                        },
                        constructor: function (operation, libros) {
                            var that = this
                            var xmlRecord = that.head()
                            _.each(libros,function(e,i){
                                xmlRecord += that.body(i, operation ,e)
                            }) 
                            xmlRecord += that.footer()
                            return xmlRecord
                        },
                        head:function(){
                            var xmlRecord = '<Message>' + newLine 
                            return xmlRecord
                        },
                        body:function(counter,operation,libro){
                            var xmlRecord = '<MessageID>' + counter + '</MessageID>' + newLine
                            xmlRecord += '<OperationType>' + operation + '</OperationType>' + newLine
                            xmlRecord += this.producto(operation,libro)
                            return xmlRecord
                        },
                        producto: function (operation,libro){
                            var xmlRecord = '<Product>'+ newLine
                            xmlRecord += '<SKU>' + libro.vendorListingid + "-" + libro._loc + '</SKU>' + newLine
                            if (operation != 'delete') {
                                if (libro.isbn != null) {
                                    xmlRecord += '<StandardProductID>' + newLine
                                    xmlRecord += '<Type>ISBN</Type>' + newLine
                                    xmlRecord += '<Value>' + libro.isbn + '</Value>' + newLine
                                    xmlRecord += '</StandardProductID>' + newLine
                                }
                                xmlRecord += '<ProductTaxCode>A_GEN_TAX</ProductTaxCode>' + newLine
                                xmlRecord += '<LaunchDate>2018-09-28T19:00:38Z</LaunchDate>' //+ new Date().toISOString() + '</LaunchDate>' + newLine
                                if (this.converters.ConditionType(libro.bookCondition).length > 0) {
                                    xmlRecord += '<Condition>' + newLine
                                    xmlRecord += '<ConditionType>' + this.converters.ConditionType(libro.bookCondition) + '</ConditionType>' + newLine
                                    xmlRecord += '</Condition>' + newLine
                                }
                                xmlRecord += '<DescriptionData>' + newLine
                                xmlRecord += '<title>' + libro.title + '</title>' + newLine
                                xmlRecord += '<author>' + libro.author + '</author>' + newLine
                                xmlRecord += '<publisher>' + libro.publisherName + '</publisher>' + newLine
                                xmlRecord += '<pub-date>' + libro.publishYear + '</pub-date>' + newLine
                                xmlRecord += '<binding>' + libro.bindingText + '</binding>' + newLine
                                xmlRecord += '</DescriptionData>' + newLine
                            }
                            xmlRecord += '</Product>'+ newLine
                            return xmlRecord
                        },
                        footer:function(){
                            var xmlRecord = '</Message>' + newLine 
                            return xmlRecord                            
                        }
                    },
                    footer : function(){
                        var xmlRecord =  '</AmazonEnvelope>'+ newLine
                        return xmlRecord
                    }
                
        },
        functions: {
            Encode_3986: function (value) {

                function isLetter(str) {
                    return str.length === 1 && str.match(/[a-z]/i);
                }

                value = value.replaceAll("'", "%27")
                value = value.replaceAll("(", "%28")
                value = value.replaceAll(")", "%29")
                value = value.replaceAll("*", "%2A")
                value = value.replaceAll("!", "%21")
                value = value.replaceAll("%7e", "~")
                value = value.replaceAll("+", "%20")
                value = value.replaceAll(":", "%3A");
                value = value.replaceAll("=", "%3D");
                value = value.replaceAll("/", "%2F");
                return value

                var sbuilder = value.split('')
                _.each(sbuilder, function (ch, i) {
                    if(i<sbuilder.length)
                        if (ch != '%' && isLetter(ch)) {
                            sbuilder[i] = ch.toUpperCase()
                            //sbuilder[i + 2] = sbuilder[i + 2].toUpperCase()
                        }
                })
                return sbuilder.join('')

            }
        }
    } 
}