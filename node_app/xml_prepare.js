
module.exports = function () {
    var _ = require('lodash');
    var _v = function(e){
        return e!=null
    }
    var newLine= String.fromCharCode(10) + String.fromCharCode(13) // "Before "+ "%0D%0A"
    return {
        apiKey : 'fcbe644dd3ba46a797be',
        apiUser : 'artesonado60@gmail.com',
        xmlIberbooks : function(libro, imagenes, accion){
            var iberRecord = '<?xml version="1.0" encoding="ISO-8859-1"?>' + newLine
            iberRecord += '<inventoryUpdateRequest version="1.0">' + newLine
            iberRecord += '<action name="bookupdate">' + newLine
            iberRecord += '<username>'+ this.apiUser+'</username>' + newLine
            iberRecord += '<password>'+this.apiKey+'</password>' + newLine
            iberRecord += '</action>' + newLine
            iberRecord += '<AbebookList>' + newLine
            iberRecord += '<Abebook>' + newLine
            if(libro.vendorListingid.length>0){                
                iberRecord +=  '<transactionType>'+accion+'</transactionType>' + newLine
                iberRecord = iberRecord + (_v(libro.vendorListingid)?'<vendorBookID>'+libro.vendorListingid+'</vendorBookID>':'')+ newLine
                iberRecord = iberRecord + (_v(libro.title)?'<title>'+libro.title+'</title>':'')+ newLine
                iberRecord = iberRecord + (_v(libro.author)?'<author>'+libro.author+'</author>':'')+ newLine
                iberRecord = iberRecord + (_v(libro.publisherName)?'<publisher>'+libro.publisherName+'</publisher>':'')+ newLine
                iberRecord = iberRecord + (_v(libro.subject)?'<subject>'+libro.subject+'</subject>':'') + newLine
                iberRecord = iberRecord + (_v(libro.price_currency)?'<price currency="'+libro.price_currency+'">'+libro.price_quantity+'</price>':'') + newLine
                iberRecord = iberRecord + (_v(libro.bindingText)?'<binding>'+libro.bindingText+'</binding>':'') + newLine
                iberRecord = iberRecord + (_v(libro.description)?'<description>'+libro.description+'</description>':'') + newLine
                iberRecord = iberRecord + (_v(libro.bookCondition)?'<bookCondition>'+libro.bookCondition+'</bookCondition>':'') + newLine
                iberRecord = iberRecord + (_v(libro.jacketCondition)?'<jacketCondition>'+libro.jacketCondition+'</jacketCondition>':'') + newLine
                iberRecord = iberRecord + (_v(libro.universalIdentifier_number)?'<isbn>'+libro.universalIdentifier_number+'</isbn>':'') + newLine
                iberRecord = iberRecord + (_v(libro.publishPlace)?'<publishPlace>'+libro.publishPlace+'</publishPlace>':'') + newLine
                iberRecord = iberRecord + (_v(libro.publishYear)?'<publishYear>'+libro.publishYear+'</publishYear>':'') + newLine
                iberRecord = iberRecord + (_v(libro.edition)?'<edition>'+libro.publishYear+'</edition>':'') + newLine
                iberRecord = iberRecord + '<quantity  amount="1"></quantity>' + newLine
                debugger
                if(imagenes.length>0){
                    iberRecord = iberRecord + '<pictureList>' + newLine
                    _.each(imagenes, function(_rPictures){
                        iberRecord = iberRecord + '<pictureURL>'+_rPictures.idpictures +'.jpg<pictureURL>' + newLine
                    })
                    iberRecord = iberRecord + '</pictureList>' + newLine
                }
                iberRecord = iberRecord + '</Abebook>'+ newLine
                iberRecord = iberRecord + '</AbebookList>'+ newLine
                iberRecord = iberRecord + '</inventoryUpdateRequest>'+ newLine
            }else{
                iberRecord = null
            }
           
            return iberRecord
        }       
    }
}