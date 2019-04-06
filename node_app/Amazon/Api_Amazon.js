module.exports = function (_, mysql, apiKey, apiUser) {
    return {
        getDb: function (req, res, _cb) {
            const fs = require('fs');

            let writeStream = fs.createWriteStream('artebooks.txt');

            // write some data with a base64 encoding
            writeStream.write('TemplateType=fptcustomlite	Version=2019.0406	TemplateSignature=Qk9PS1NfMTk3M19BTkRfTEFURVI=	Las 3 primeras filas son para uso exclusivo de Amazon.com. No modifique ni elimine las 3 primeras filas.													Básica		Descubrimiento	Mejora del listing											Cumplimiento							Cumplimiento normativo																																\n');
            writeStream.write('Tipo de producto	SKU	Identificador de producto	Tipo de identificador de producto	Título	Casa discográfica	Autor	Autor	Autor	Tipo de libro	Año de publicación	Nodos de navegación recomendados	Precio	Cantidad	Actualizar o eliminar	Dirección URL de la imagen principal	Descripción del producto	Edición	Términos de búsqueda	Ilustrador	Colaborador	Colaborador	Colaborador	Colaborador	Colaborador	Colaborador	Colaborador	Colaborador	Colaborador	Colaborador	Identificador de centro logístico	Altura del paquete	Ancho del paquete	Longitud del paquete	"Unidad de medida del atributo ""Dimensiones del paquete"""	Peso del paquete	"Unidad de medida del atributo ""Peso del paquete"""	¿El producto es o contiene una batería o pila ? Pilas incluidas	Composición de la batería o pila	Tamaño / tipo de batería o pila	Tamaño / tipo de batería o pila	Tamaño / tipo de batería o pila	Cantidad de baterías o pilas	Cantidad de baterías o pilas	Cantidad de baterías o pilas	Peso de la batería o pila(en gramos)	battery_weight_unit_of_measure	Número de células metal de litio	Número de células Ion de litio	Embalaje de la bateria de litio	Vatios por hora de cada batería o pila	lithium_battery_energy_content_unit_of_measure	Contenido de litio(en gramos)	lithium_battery_weight_unit_of_measure	Regulaciones aplicables a los materiales peligrosos	Regulaciones aplicables a los materiales peligrosos	Regulaciones aplicables a los materiales peligrosos	Regulaciones aplicables a los materiales peligrosos	Regulaciones aplicables a los materiales peligrosos	Número ONU	URL de la ficha de datos de seguridad(FDS)	Peso del producto	item_weight_unit_of_measure	Capacidad de la piscina	Unidad de medida de la capacidad de la piscina	Punto de inflamación(en ºC)	Categorización / pictogramas GHS(selecciona tantas opciones como corresponda)	Categorización / pictogramas GHS(selecciona tantas opciones como corresponda)	Categorización / pictogramas GHS(selecciona tantas opciones como corresponda)\n');
            writeStream.write('feed_product_type	item_sku	external_product_id	external_product_id_type	item_name	manufacturer	author1	author2	author3	binding	publication_date	recommended_browse_nodes	standard_price	quantity	update_delete	main_image_url	product_description	edition	generic_keywords	illustrator	contributor1	contributor2	contributor3	contributor4	contributor5	contributor6	contributor7	contributor8	contributor9	contributor10	fulfillment_center_id	package_height	package_width	package_length	package_dimensions_unit_of_measure	package_weight	package_weight_unit_of_measure	batteries_required	are_batteries_included	battery_cell_composition	battery_type1	battery_type2	battery_type3	number_of_batteries1	number_of_batteries2	number_of_batteries3	battery_weight	battery_weight_unit_of_measure	number_of_lithium_metal_cells	number_of_lithium_ion_cells	lithium_battery_packaging	lithium_battery_energy_content	lithium_battery_energy_content_unit_of_measure	lithium_battery_weight	lithium_battery_weight_unit_of_measure	supplier_declared_dg_hz_regulation1	supplier_declared_dg_hz_regulation2	supplier_declared_dg_hz_regulation3	supplier_declared_dg_hz_regulation4	supplier_declared_dg_hz_regulation5	hazmat_united_nations_regulatory_id	safety_data_sheet_url	item_weight	item_weight_unit_of_measure	item_volume	item_volume_unit_of_measure	flash_point	ghs_classification_class1	ghs_classification_class2	ghs_classification_class3\n');
            // the finish event is emitted when all data has been flushed from the stream
            writeStream.on('finish', () => {
                console.log('wrote all data to file');
                _cb('./artebooks.txt')
            });

            mysql.query('SELECT * FROM books WHERE length(_loc)>0 and _sale is null order by vendorlistingid;', function (err, records) {
                _.each(records,(function (p) {

                    const _rec = [
                        'bookloader',                                               //feed_product_type
                        p.vendorListingid + '-' + p._loc,                           //item_sku
                        p.universalIdentifier_isvalid ? p.universalIdentifier_number : '',      //external_product_id
                        p.universalIdentifier_isvalid ? p.universalIdentifier_numberType : '',  //external_product_id_type
                        p.title,            //item_name
                        p.publisherName,    //manufacturer
                        p.author,           //author1
                        '',                 //author2
                        '',                 //author3
                        'Album',            //binding
                        p.publishYear,      //publication_date
                        '14759419031',      //recommended_browse_nodes
                        p.price_quantity,   //standard_price
                        1,                  //quantity
                        'update',           //update_delete
                        '',                 //main_image_url

                        p.description,      //product_description
                        p.edition,         //edition

                        '',                //generic_keywords

                        '',                //illustrator
                        '',                //contributor1
                        '',                //contributor2
                        '',                //contributor3
                        '',                //contributor4
                        '',                //contributor5
                        '',                //contributor6
                        '',                //contributor7
                        '',                //contributor8
                        '',                //contributor9
                        '',                //contributor10
                        
                        '',                 //fulfillment_center_id
                        '',                 //package_height
                        '',                 //package_width
                        '',                 //package_length
                        '',                 //package_dimensions_unit_of_measure
                        '',                 //package_weight
                        '',                 //package_weight_unit_of_measure


                        '',                 //batteries_required
                        '',                 //are_batteries_included
                        '',                 //battery_cell_composition
                        '',                 //battery_type1
                        '',                 //battery_type2
                        '',                 //battery_type3
                        '',                 //number_of_batteries1
                        '',                 //number_of_batteries2
                        '',                 //number_of_batteries3
                        '',                 //battery_weight
                        '',                 //battery_weight_unit_of_measure
                        '',                 //number_of_lithium_metal_cells
                        '',                 //number_of_lithium_ion_cells
                        '',                 //lithium_battery_packaging             
                        '',                 //lithium_battery_energy_content
                        '',                 //lithium_battery_energy_content_unit_of_measure                 
                        '',                 //lithium_battery_weight
                        '',                 //lithium_battery_weight_unit_of_measure
                        '',                 //supplier_declared_dg_hz_regulation1
                        '',                 //supplier_declared_dg_hz_regulation3
                        '',                 //supplier_declared_dg_hz_regulation4
                        '',                 //supplier_declared_dg_hz_regulation5
                        '',                 //hazmat_united_nations_regulatory_id
                        '',                 //safety_data_sheet_url
                        '',                 //item_weigth
                        '',                 //item_weight_unit_of_measure
                        '',                 //item_volume
                        '',                 //item_volume_unit_of_measure
                        '',                 //flash_point
                        '',                 //ghs_classification_class1
                        '',                 //ghs_classification_class2
                        ''                  //ghs_classification_class3

                    ]

                    writeStream.write(_rec.join("\t")+"\n")

                    
                }))
                writeStream.end();
            })
            
            // close the stream
            
        }
    }
}