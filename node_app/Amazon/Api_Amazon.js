module.exports = function (_, mysql, apiKey, apiUser) {
    //const _ = require('lodash')


    return {
        getDb: function (req, res, _cb) {
            const fs = require('fs');
            

            let writeStream = [] //fs.createWriteStream('artebooks.txt');

            // write some data with a base64 encoding
            writeStream.push('TemplateType=BookLoader	Version=2014.1228	Las 3 primeras filas son para uso exclusivo de Amazon.com. No modifique ni elimine las 3 primeras filas.									Ofertas - Información de ofertas - Estos atributos se utilizan para que los clientes puedan comprar su artículo en la página web.							Descubrimiento - Información de descubrimiento del artículo - Estos atributos afectan a la forma en que los clientes pueden encontrar su producto en la página web navegando o buscando por Internet.					Imágenes - Información de imágenes - Encontrará más información en la ficha Instrucciones para imágenes.	Cumplimiento - usa esta columna para proporcionar información relacionada con la gestión de tus pedidos, tanto los gestionados por Amazon como los que gestiones tí mismo.							Desagrupado - Estos atributos generan listas de productos con muchos detalles para los compradores.			');
            writeStream.push('SKU	Identificador de producto	Tipo de identificador de producto	Título	Casa discográfica	Descripción del producto	Actualizar o eliminar	Autor	Tipo de libro	Año de publicación	Edición	Precio	Cantidad	Estado del producto	Nota sobre estado	Envío urgente	Envío internacional	Grupo de envío	Términos de búsqueda1	Términos de búsqueda2	Términos de búsqueda3	Términos de búsqueda4	Términos de búsqueda5	Dirección URL de la imagen principal	Identificador de centro logístico	Dimensiones de embalaje	Dimensiones de embalaje	Dimensiones de embalaje	Unidad de medida del atributo "Dimensiones del paquete"	Dimensiones de embalaje	Unidad de medida del atributo "Peso del paquete"	Temática del libro	Idioma	Volumen de la serie	Ilustrador');
            writeStream.push('item_sku	external_product_id	external_product_id_type	item_name	manufacturer	product_description	update_delete	author	binding	publication_date	edition	standard_price	quantity	condition_type	condition_note	expedited_shipping	will_ship_internationally	merchant_shipping_group_name	generic_keywords1	generic_keywords2	generic_keywords3	generic_keywords4	generic_keywords5	main_image_url	fulfillment_center_id	package_height	package_width	package_length	package_dimensions_unit_of_measure	package_weight	package_weight_unit_of_measure	unknown_subject	language_value	volume_base	illustrator');

            mysql.query('SELECT * FROM books WHERE length(_loc)>0 and _sale is null order by vendorlistingid;', function (err, records) {
                _.each(records,(function (p) {
                    if (p.author.indexOf('|') > -1)
                        p.author = p.author.replace(/\|/g, ';').replace(/\, ;/g, ';').replace(/\,;/g, ';')
                    const _rec = [                                              //feed_product_type
                        p.vendorListingid + '-' + p._loc,                           //item_sku
                        p.universalIdentifier_number!=null? p.universalIdentifier_isvalid ? p.universalIdentifier_number.length>9? p.universalIdentifier_number : '':'':'',      //external_product_id
                        p.universalIdentifier_number !=null ?p.universalIdentifier_isvalid ? p.universalIdentifier_number.length>9? p.universalIdentifier_numberType : '':'':'',  //external_product_id_type
                        p.title,            //item_name
                        p.publisherName,    //manufacturer
                        p.description == null ? '...' : p.description.substr(0, 1999).replace(/[^ -~]+/g, ""), //.replace(/\n/g,''),      //product_description
                        'update',           //update_delete
                        p.author=='.'? 'Sin Autor' : p.author.substr(0,198) ,           //author1
                        'Library',          //binding
                        p.publishYear,      //publication_date
                        p.edition,          //edition

                        p.price_quantity,   //standard_price
                        1,                  //quantity
                        'DeColeccionistaMuyBueno',  //condition_type
                        '',         //condition_note
                        '',         //expedited_shipping
                        '',   //will_ship_internationally
                        '',   //merchant_shipping_group_name

                        '',    //generic_keywords1
                        '', //generic_keywords2
                        '', //generic_keywords3
                        '', //generic_keywords4
                        '', //generic_keywords5

                        '', //main_image_url

                        '', //fulfillment_center_id
                        '', //package_height
                        '', //package_width
                        '', //package_length
                        '', //package_dimensions_unit_of_measure
                        '', //package_weight
                        '', //package_weight_unit_of_measure

                        '', //unknown_subject
                        '', //language_value
                        '', //volume_base
                        '', //illustrator

                    ]

                    writeStream.push(_rec.join("\t"))

                    
                }))
                _cb(writeStream, './artebooks.txt')
                //writeStream.end();
            })
            
            // close the stream
            
        }
    }
}