
module.exports = function () {
    var _ = require('lodash');
    return {
        apiKey : 'fcbe644dd3ba46a797be',
        apiUser : 'artesonado60@gmail.com',
        xmlIberbooks : function(libro, imagenes, accion){
            var iberRecord = '<?xml version="1.0" encoding="ISO-8859-1"?><inventoryUpdateRequest version="1.0"><action name="bookupdate"><username>'+ this.apiUser+'</username><password>'+this.apiKey+'</password></action><AbebookList><Abebook>'
            if(libro.vendorListingid.length>0){                
                iberRecord = iberRecord + '<transactionType>'+accion+'</transactionType>'
                iberRecord = iberRecord + _n(libro.vendorListingid)?'<vendorBookID>'+libro.vendorListingid+'</vendorBookID>':''
                iberRecord = iberRecord + _n(libro.title)?'<title>'+libro.title+'</title>':''
                iberRecord = iberRecord + _n(libro.author)?'<author>'+libro.author+'</author>':''
                iberRecord = iberRecord + _n(libro.publisherName)?'<publisher>'+libro.publisherName+'</publisher>':''
                iberRecord = iberRecord + _n(libro.subject)?'<subject>'+libro.subject+'</subject>':''
                iberRecord = iberRecord + _n(libro.price_currency)?'<price currency="'+libro.price_currency+'">'+libro.price_quantity+'</price>':''
                iberRecord = iberRecord + _n(libro.bindingText)?'<binding>'+libro.bindingText+'</binding>':''
                iberRecord = iberRecord + _n(libro.description)?'<description>'+libro.description+'</description>':''
                iberRecord = iberRecord + _n(libro.bookCondition)?'<bookCondition>'+libro.bookCondition+'</bookCondition>':''
                iberRecord = iberRecord + _n(libro.jacketCondition)?'<jacketCondition>'+libro.jacketCondition+'</jacketCondition>':''
                iberRecord = iberRecord + _n(libro.universalIdentifier_number)?'<isbn>'+libro.universalIdentifier_number+'</isbn>':''
                iberRecord = iberRecord + _n(libro.publishPlace)?'<publishPlace>'+libro.publishPlace+'</publishPlace>':''
                iberRecord = iberRecord + _n(libro.publishYear)?'<publishYear>'+libro.publishYear+'</publishYear>':''
                iberRecord = iberRecord + _n(libro.edition)?'<edition>'+libro.publishYear+'</edition>':''
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