
module.exports = function (apiKey,apiUser) {
    var _ = require('lodash');
    var _v = function(e){
        return e!=null
    }
    var iconv = require('iconv-lite')
    var newLine= String.fromCharCode(10) + String.fromCharCode(13) // "Before "+ "%0D%0A"
    return {      
        
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
                        constructor:function(operation,libros){
                            var xmlRecord = this.head()
                            libros.each(function(e,i){
                                xmlRecord += this.body(e, operation ,i)
                            }) 
                            xmlRecord += this.footer()
                            return xmlRecord
                        },
                        head:function(){
                            var xmlRecord = '<Message>' + newLine 
                            return xmlRecord
                        },
                        body:function(counter,operation,libro){
                            var xmlRecord = '<MessageID>' + counter + '</MessageID>' + newLine
                            xmlRecord += '<OperationType>' + operation + '</OperationType>' + newLine
                            xmlRecord += this.producto(libro)
                            return xmlRecord
                        },
                        producto:function(libro){
                            var xmlRecord = '<Product>'+ newLine
                            xmlRecord += '<SKU>' + libro.vendorListingid + '</SKU>' + newLine
                            
                            //... http://docs.developer.amazonservices.com/en_ES/feeds/Feeds_SubmitFeed.html

                            xmlRecord += '</Product>'+ newLine
                            
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
                
                }
        } 
       
    
}