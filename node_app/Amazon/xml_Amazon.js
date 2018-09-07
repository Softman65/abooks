
module.exports = function (apiKey,apiUser) {
    var _ = require('lodash');
    var _v = function(e){
        return e!=null
    }

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
                        converters:{ 
                            ConditionType : function(_c){
                                Aceptable
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
                            if(libro.isbn!=null){
                                xmlRecord +='<StandardProductID>'+ newLine 
                                xmlRecord +='<Type>ISBN</Type>'+ newLine 
                                xmlRecord +='<Value>'+libro.isbn+'</Value>'+ newLine 
                                xmlRecord +='</StandardProductID>'+ newLine
                            }
                            xmlRecord +='<ProductTaxCode>A_GEN_TAX</ProductTaxCode>' + newLine
                            xmlRecord +='<LaunchDate>'+new Date().toISOString()+'</LaunchDate>' + newLine
                            xmlRecord +='<Condition>'+ newLine
                            xmlRecord +='<ConditionType>'+this.converters.ConditionType(libro.bookCondition)+'</ConditionType>' + newLine
                            xmlRecord +='</Condition>'+ newLine
                            xmlRecord +='<DescriptionData>'+ newLine
                            xmlRecord +='<title>'+ libro.title + '</title>'+ newLine
                            xmlRecord +='<author>'+ libro.author + '</author>'+ newLine
                            xmlRecord +='<publisher>'+ libro.publisherName + '</publisher>'+ newLine
                            xmlRecord +='<pub-date>'+ libro.publishYear + '</pub-date>'+ newLine
                            xmlRecord +='<binding>'+ libro.bindingText + '</binding>'+ newLine
                            xmlRecord +='</DescriptionData>'+ newLine
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