
module.exports = function (socket, callback) {

    return {
        xmlIberbooks : function(libro, imagenes, accion){

            var iberRecord = '<?xml version="1.0" encoding="ISO-8859-1"?><inventoryUpdateRequest version="1.0"><action name="bookupdate"><username>artebooks39@gmail.com</username><password>guatemala016</password></action><AbebookList><Abebook>'
            iberRecord = iberRecord + '<transactionType>'+accion+'</transactionType>'
            iberRecord = iberRecord + (libro.idbooks.length>0?'<vendorBookID>'+libro.idbooks+'</vendorBookID>':'')
            iberRecord = iberRecord + (libro.title.length>0?'<title>'+libro.title+'</title>':'')
            iberRecord = iberRecord + (libro.author.length>0?'<author>'+libro.author+'</author>':'')
            iberRecord = iberRecord + (libro.title.publisherName.length>0?'<publisher>'+libro.publisherName+'</publisher>':'')
        //    iberRecord = iberRecord + (libro.subject.length>0?'<subject>'+libro.subject+'</subject>':'')
            iberRecord = iberRecord + (libro.title.price_currency.length>0?'<price currency="'+libro.price_currency+'">'+libro.price_quantity+'</price>':'')
            iberRecord = iberRecord + (libro.title.bindingText.length>0?'<binding>'+libro.bindingText+'</binding>':'')
            iberRecord = iberRecord + (libro.title.description.length>0?'<description>'+libro.description+'</description>':'')
            iberRecord = iberRecord + (libro.title.bookCondition.length>0?'<bookCondition>'+libro.bookCondition+'</bookCondition>':'')
            iberRecord = iberRecord + (libro.title.jacketCondition.length>0?'<jacketCondition>'+libro.jacketCondition+'</jacketCondition>':'')
            iberRecord = iberRecord + (libro.title.universalIdentifier_number.length>0?'<isbn>'+libro.universalIdentifier_number+'</isbn>':'')
        //    iberRecord = iberRecord + (libro.title.publishPlace.length>0?'<publishPlace>'+libro.publishPlace+'</publishPlace>':'')
            iberRecord = iberRecord + (libro.title.publishYear.length>0?'<publishYear>'+libro.publishYear+'</publishYear>':'')
            iberRecord = iberRecord + (libro.title.edition.length>0?'<edition>'+libro.publishYear+'</edition>':'')
            iberRecord = iberRecord + '<quantity  amount="1"></quantity>'
            if(records[1].length>0){
                iberRecord = iberRecord + '<pictureList>'
                _.each(imagenes, function(_rPictures){
                    iberRecord = iberRecord + '<pictureURL>'+_rPictures.idpictures +'.jpg<pictureURL>'
                })
                iberRecord = iberRecord + '</pictureList>'
            }
            iberRecord = iberRecord + '</Abebook>'
            iberRecord = iberRecord + '</AbebookList>'
            iberRecord = iberRecord + '</inventoryUpdateRequest>'

            return iberRecord
        }
    }
}