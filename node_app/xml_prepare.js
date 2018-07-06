
module.exports = function () {
    var _ = require('lodash');
    return {
        apiKey : 'fcbe644dd3ba46a797be',
        apiUser : 'artesonado60@gmail.com',
        xmlIberbooks : function(libro, imagenes, accion){
            var iberRecord = '<?xml version="1.0" encoding="ISO-8859-1"?><inventoryUpdateRequest version="1.0"><action name="bookupdate"><username>'+ this.apiUser+'</username><password>'+this.apiKey+'</password></action><AbebookList><Abebook>'
            if(libro.vendorListingid.length>0){                
                iberRecord = iberRecord + '<transactionType>'+accion+'</transactionType>'
                iberRecord = iberRecord + (libro.vendorListingid.length>0?'<vendorBookID>'+libro.vendorListingid+'</vendorBookID>':'')
                iberRecord = iberRecord + (libro.title.length>0?'<title>'+libro.title+'</title>':'')
                iberRecord = iberRecord + (libro.author.length>0?'<author>'+libro.author+'</author>':'')
                iberRecord = iberRecord + (libro.publisherName.length>0?'<publisher>'+libro.publisherName+'</publisher>':'')
            //    iberRecord = iberRecord + (libro.subject.length>0?'<subject>'+libro.subject+'</subject>':'')
                iberRecord = iberRecord + (libro.price_currency.length>0?'<price currency="'+libro.price_currency+'">'+libro.price_quantity+'</price>':'')
                iberRecord = iberRecord + (libro.bindingText.length>0?'<binding>'+libro.bindingText+'</binding>':'')
                iberRecord = iberRecord + (libro.description.length>0?'<description>'+libro.description+'</description>':'')
                iberRecord = iberRecord + (libro.bookCondition.length>0?'<bookCondition>'+libro.bookCondition+'</bookCondition>':'')
                iberRecord = iberRecord + (libro.jacketCondition.length>0?'<jacketCondition>'+libro.jacketCondition+'</jacketCondition>':'')
                iberRecord = iberRecord + (libro.universalIdentifier_number.length>0?'<isbn>'+libro.universalIdentifier_number+'</isbn>':'')
                iberRecord = iberRecord + (libro.publishPlace.length>0?'<publishPlace>'+libro.publishPlace+'</publishPlace>':'')
                iberRecord = iberRecord + (libro.publishYear.length>0?'<publishYear>'+libro.publishYear+'</publishYear>':'')
                iberRecord = iberRecord + (libro.edition.length>0?'<edition>'+libro.publishYear+'</edition>':'')
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