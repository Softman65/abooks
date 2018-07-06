
module.exports = function () {
    var _ = require('lodash');
    var _v = function(e){
        return e!=null
    }
    return {
        apiKey : 'fcbe644dd3ba46a797be',
        apiUser : 'artesonado60@gmail.com',
        xmlIberbooks : function(libro, imagenes, accion){
            var iberRecord = '<?xml version="1.0" encoding="ISO-8859-1"?><inventoryUpdateRequest version="1.0"><action name="bookupdate"><username>'+ this.apiUser+'</username><password>'+this.apiKey+'</password></action><AbebookList><Abebook>'
            if(libro.vendorListingid.length>0){                
                iberRecord = iberRecord + '<transactionType>'+accion+'</transactionType>'
                iberRecord = iberRecord + (_v(libro.vendorListingid)?'<vendorBookID>'+libro.vendorListingid+'</vendorBookID>':'')
                iberRecord = iberRecord + (_v(libro.title)?'<title>'+libro.title+'</title>':'')
                iberRecord = iberRecord + (_v(libro.author)?'<author>'+libro.author+'</author>':'')
                iberRecord = iberRecord + (_v(libro.publisherName)?'<publisher>'+libro.publisherName+'</publisher>':'')
                iberRecord = iberRecord + (_v(libro.subject)?'<subject>'+libro.subject+'</subject>':'')
                iberRecord = iberRecord + (_v(libro.price_currency)?'<price currency="'+libro.price_currency+'">'+libro.price_quantity+'</price>':'')
                iberRecord = iberRecord + (_v(libro.bindingText)?'<binding>'+libro.bindingText+'</binding>':'')
                iberRecord = iberRecord + (_v(libro.description)?'<description>'+libro.description+'</description>':'')
                iberRecord = iberRecord + (_v(libro.bookCondition)?'<bookCondition>'+libro.bookCondition+'</bookCondition>':'')
                iberRecord = iberRecord + (_v(libro.jacketCondition)?'<jacketCondition>'+libro.jacketCondition+'</jacketCondition>':'')
                iberRecord = iberRecord + (_v(libro.universalIdentifier_number)?'<isbn>'+libro.universalIdentifier_number+'</isbn>':'')
                iberRecord = iberRecord + (_v(libro.publishPlace)?'<publishPlace>'+libro.publishPlace+'</publishPlace>':'')
                iberRecord = iberRecord + (_v(libro.publishYear)?'<publishYear>'+libro.publishYear+'</publishYear>':'')
                iberRecord = iberRecord + (_v(libro.edition)?'<edition>'+libro.publishYear+'</edition>':'')
                iberRecord = iberRecord + '<quantity  amount="1"></quantity>'
                debugger
                if(imagenes.length>0){
                    iberRecord = iberRecord + '<pictureList>'
                    _.each(imagenes, function(_rPictures){
                        iberRecord = iberRecord + '<pictureURL>'+_rPictures.idpictures +'.jpg<pictureURL>'
                    })
                    iberRecord = iberRecord + '</pictureList>'
                }
                iberRecord = iberRecord + '</Abebook>'
                iberRecord = iberRecord + '</AbebookList>'
                iberRecord = iberRecord + '</inventoryUpdateRequest>'
            }else{
                iberRecord = null
            }
           
            return iberRecord
        }       
    }
}