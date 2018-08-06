
module.exports = function (apiKey,apiUser) {
    var _ = require('lodash');
    var _v = function(e){
        return e!=null
    }
    var iconv = require('iconv-lite')
    var newLine= String.fromCharCode(10) + String.fromCharCode(13) // "Before "+ "%0D%0A"
    return {
        
        xmlIberbooks : { 
            apiKey : apiKey,
            apiUser : apiUser,
            xmlUnit: function(action,libro,  imagenes) {
                var xml = this.functions().header( this.apiUser,this.apiKey)
                if(action=='update' || action=='delete'){
                    xml += this.functions().action.delete(libro)
                }
                if(libro.vendorListingid.length>0 && (action=='update' || action=='add')){
                    xml+=this.functions().action.add(libro,imagenes)
                }
                xml+=this.functions().footer()               
                return iconv.encode(xml, 'iso-8859-1'); //iberRecord
            },
            functions:  function(){
                return { 
                    header : function(apiUser,apiKey){
                        var iberRecord = '<?xml version="1.0" encoding="ISO-8859-1"?>' + newLine
                        iberRecord += '<inventoryUpdateRequest version="1.0">' + newLine
                        iberRecord += '<action name="bookupdate">' + newLine
                        iberRecord += '<username>'+ apiUser+'</username>' + newLine
                        iberRecord += '<password>'+ apiKey+'</password>' + newLine
                        iberRecord += '</action>' + newLine
                        iberRecord += '<AbebookList>' + newLine
                        return iberRecord
                    },
                    action : { 
                        delete: function(libro){
                            var iberRecord = '<Abebook>' + newLine
                            iberRecord += '<transactionType>delete</transactionType>' + newLine
                            iberRecord +=  (_v(libro.vendorListingid)?'<vendorBookID>'+libro.vendorListingid+'</vendorBookID>':'')+ newLine
                            iberRecord += '</Abebook>'+ newLine
                            return iberRecord
                        },
                        add : function(libro,imagenes){
                            var iberRecord = '<Abebook>' + newLine                
                            iberRecord +=  '<transactionType>add</transactionType>' + newLine
                            iberRecord += (_v(libro.vendorListingid)?'<vendorBookID>'+libro.vendorListingid+'</vendorBookID>':'')+ newLine
                            iberRecord += (_v(libro.title)?'<title>'+libro.title+'</title>':'')+ newLine
                            iberRecord += (_v(libro.author)?'<author>'+libro.author+'</author>':'')+ newLine
                            iberRecord += (_v(libro.publisherName)?'<publisher>'+libro.publisherName+'</publisher>':'')+ newLine
                            iberRecord += (_v(libro.subject)?'<subject>'+libro.subject+'</subject>':'') + newLine
                            iberRecord += (_v(libro.price_currency)?'<price currency="'+libro.price_currency+'">'+libro.price_quantity+'</price>':'') + newLine
                            iberRecord += (_v(libro.bindingText)?'<binding>'+libro.bindingText+'</binding>':'') + newLine
                            iberRecord += (_v(libro.description)?'<description>'+libro.description+'</description>':'') + newLine
                            iberRecord += (_v(libro.bookCondition)?'<bookCondition>'+libro.bookCondition+'</bookCondition>':'') + newLine
                            iberRecord += (_v(libro.jacketCondition)?'<jacketCondition>'+libro.jacketCondition+'</jacketCondition>':'') + newLine
                            iberRecord += (_v(libro.universalIdentifier_number)?'<isbn>'+libro.universalIdentifier_number+'</isbn>':'') + newLine
                            iberRecord += (_v(libro.publishPlace)?'<publishPlace>'+libro.publishPlace+'</publishPlace>':'') + newLine
                            iberRecord += (_v(libro.publishYear)?'<publishYear>'+libro.publishYear+'</publishYear>':'') + newLine
                            iberRecord += (_v(libro.edition)?'<edition>'+libro.publishYear+'</edition>':'') + newLine
                            iberRecord += '<quantity  amount="1"></quantity>' + newLine
                            debugger
                            if(imagenes.length>0){
                                iberRecord +=  '<pictureList>' + newLine
                                _.each(imagenes, function(_rPictures){
                                    iberRecord +=  '<pictureURL>'+_rPictures.idpictures +'.jpg<pictureURL>' + newLine
                                })
                                iberRecord +=  '</pictureList>' + newLine
                            }
                            iberRecord +=  '</Abebook>'+ newLine
                            return iberRecord
                        }
                    },
                    footer : function(){
                        var iberRecord =  '</AbebookList>'+ newLine
                        iberRecord +=  '</inventoryUpdateRequest>'+ newLine
                        return iberRecord
                    }
                }
            }

        }, xmlAmazon: function(action,libro,  imagenes){

        }     
    }
}