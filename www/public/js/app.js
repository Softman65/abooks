$(document).ready(function() {
    
    $('.destino').hide()

    function imageForm(item,objdestino){
        $.fn.webCamera('photo',function(imgData){
            $('#images').modal('hide')
            $(objdestino).attr("src",imgData).show()

            $.ajax({
                type: "POST",
                url: "/api/books/imageSave?vendorListingid="+$(objdestino).attr("data") ,
                data: { image : imgData}
            }).done(function( data ) {
                
                alert('foto guardada')
                  
            });



        })

        $('#images').modal({
            onApprove : function() {
                debugger
            } 
        }).modal('show')
    }
    function bookfinder(form,_id){
        var has_also = false
        $('.bookfinder.'+form).html('').addClass('loading')
        $.ajax('/api/bookfinder?id=' + _id )
        .done(function(tables) {
             
             $('#edit .header.'+form).removeClass('hidden')
             $('#edit .back').click(function(){
                 if(window.PanelA!=null)
                     $('.bookfinder.' + form).html( getClick(window.PanelA, form) )
             })
            var $data =$('<div>')
            var p = $($(tables.body).find("#bd")).children()
            _.each(p, function(value,key){
                if($(value).hasClass('select-authorname'))
                    $data.append( $(value).clone() )
                if($(value).hasClass('select-titlenames'))
                    $data.append($(value).clone())
                if($(value).hasClass('select-see-also')){
                    $data.append($(value).clone())
                    has_also = true
                 }
                if(has_also && $(value).is('ul'))
                    $data.append($(value).clone()) 
            })

            function getClick($data, form){
                 $data.find('a').click(function(e){
                     $('.bookfinder.' + form).addClass('loading')
                     var url = $(this).attr('href').split("?")[1]
                     $.ajax('/api/bookfinder?urlquery=' + url)
                         .done(function(tables) {
                             var $data =$('<div>').append($(tables.body).find('h3').clone())
                             .append($(tables.body).find('table.results-table-Logo').clone())
                             $('.bookfinder.' + form).removeClass('loading').html($data)
                             _.each($('.bookfinder.' + form).find('.results-explanatory-text-Logo'), function($elem){
                                 if($($elem).html()=='Artebooks'){
                                     $($elem).parent().parent().addClass('red')
                                     //$.ajax('/api/save/bookfinder?id='+_id+'urlquery=' + url)
                                     //.done(function(tables) {
                                     //    debugger
                                     //})
                                 }

                             })
                         })
                     return false
                 })
                 return $data
             }
             
            window.PanelA = getClick($data , form)
            $('.bookfinder.'+form).removeClass('loading').html($data)
        })
    }
    function editForm(_content,_type,args){
        $('#edit').attr('data',_content)
        $('#edit .content').addClass('hidden')
        $('#edit .content.'+_content).removeClass('hidden')
        
        $('#edit').modal(
            {
                onVisible: function(){
                    setTimeout(function(){
                            $('#edit .header.iberlibro').addClass('hidden')
                            if(_type=='edit'){
                                //debugger
                                $('#edit [name="universalIdentifier_number"]').focus()
                            }else{
                                $('#id').focus()
                            }
                        },10)
                },
                onDeny    : function(){
                  return true;
                },
                onApprove : function() {
                  var $form = $('#edit').attr('data') =='formIberlibro' ? $("form.editIberlibro") : ($('#edit').attr('data') =='formAmazon'?$("form.editAmazon"):$("form.editForm"))
                  var _JsonArgs={}
                  if(_type=='edit'){
                    _JsonArgs = diferences(getFormData($form),args.item)
                  }else{
                    _JsonArgs = getFormData($form)
                  }
                  //debugger
    
                  if(_JsonArgs!=null){ 
                      $.ajax({
                          type: "POST",
                          url: "/api/books/" + _type +(_type=='edit'?"?form="+$('#edit').attr('data') +'&vendorListingid='+args.item.vendorListingid:''),
                          data: _JsonArgs
                      }).done(function( data ) {
                          console.log(data)
                          $("#jsGrid").jsGrid( "loadData" );   
                      });
                  }else{
                      alert('Sin cambios que guardar')
                  }
                }
        }).modal('show')

        //debugger
        if(_type=='edit'){
            var getData = args.item;
            var keys = Object.keys(getData);
            var text = [];
           
            $.each(keys, function(idx, value) {
                if(value == 'description'){
                    $('#edit textarea[name="'+value+'"]').text(getData[value])
                }else{
                    if(value == '_sales' || value == '_iberlibro'){
                        
                            $('#edit .ui.toggle.checkbox [name="'+value+'"]').parent().checkbox(getData[value]==null?'uncheck':getData[value].length>0?'check':'uncheck')

                    }else{
                        if($('#edit input[name="'+value+'"]').attr('type')!='hidden'){
                            $('#edit input[name="'+value+'"]').val(getData[value]) //.removeAttr("disabled")
                        }else{
                            $('#edit .'+value+' .text').removeClass('default').html(getData[value])
                            $('#edit .'+value+' [type="hidden"]').val(getData[value])
                        }
                    }
                }
              //text.push(value + " : " + getData[value])
            });
           // $('#id').val(getData.vendorListingid)
            $('#edit .ui.approve.button').html('Guardar')
            $('#edit .header.book').html('<span><span class="left green">'+getData.title+'</span><span class="right">'+getData.vendorListingid+'-<span class="red">'+(getData._loc==null?'?':getData._loc)+'</span></span></span>')
           
        }else{

            $('#edit input').each(function(obj){
                var q = $($('#edit input')[obj]).val('')
                //$(q).val('')
            })
            $('#edit textarea').text('')
            dropdownFormEdit('restore defaults')
            
            $('#edit .header.book').html('Nuevo Libro')
            $('#edit .ui.approve.button').addClass("disabled").html('Crear')
            $('#edit .ui.toggle.checkbox [name="_iberlibro"]').parent().checkbox('check')
            debugger
        }


        
        $(' input.numeric').keydown(function(event){
            return ( (event.which >47 &&  event.which <63) || event.which ==13 || event.which==46 || event.which==8) 
        })

        $('.validate input').keyup(function(event){
            if($(this).val().length==0){
                $(this).parent().addClass('error')
            }else{
                $(this).parent().removeClass('error')
            }

            if($('#edit .error').length>0){
                $('.ui.approve.button').addClass('disabled')
            }else{
                $('.ui.approve.button').removeClass('disabled')
            }
        })

    }
    function validateForm($form){
        var _e = $('.validate').find('input')
       // debugger
    }
    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};
        //debugger

        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });
    
        return indexed_array;
    }
    function diferences(modificado,original){
        var _ret = {}
        _.each(modificado, function(value,key){
            if(value!=original[key] || ((value.length>0 && original[key]==null) || (value.length==0 && (original[key]!=null || original[key].length>0)) ))
                _ret[key]=value
        })
        return _ret!={}?_ret:null
    }
    function dropdownFormEdit(command, data){
        if(command == 'refresh'){
            $('#edit .ui.dropdown.productType .menu').html(data.productType) 
            $('#edit .ui.dropdown.bookCondition .menu').html(data.bookCondition)
            $('#edit .ui.dropdown.jacketCondition .menu').html(data.jacketCondition)
            $('#edit .ui.dropdown.inscriptionType .menu').html(data.inscriptionType)
            $('#edit .ui.dropdown.bindingText .menu').html(data.binding)
            $('#edit .ui.dropdown.edition .menu').html(data.edition)
        }
        $('#edit .ui.dropdown.productType').dropdown(command)
        $('#edit .ui.dropdown.bookCondition').dropdown(command)
        $('#edit .ui.dropdown.jacketCondition').dropdown(command)
        $('#edit .ui.dropdown.inscriptionType').dropdown(command)
        $('#edit .ui.dropdown.bindingText').dropdown(command)
        $('#edit .ui.dropdown.edition').dropdown(command)
    }
    function gridTorecord(_id){
        
        var _item = {}
        //window.data.pageData
        _.forEach( $("#jsGrid").jsGrid("option", "data") , function(record) {
            if(record.vendorListingid==_id){
                _.forEach(record, function(value, _key) {
                    
                    if(_key!='img')
                        _item[_key] = value
                })
            }
        })
        return _item
    }

    $.ajax({
        url: "/api/books/tables",
        dataType: "json"
    }).done(function(tables) {
           window.data = { tables :tables }

            var data = {}
            _.each(tables[1],function(row){
                if(data[row.name]==null)
                data[row.name]=''
                data[row.name] = data[row.name] +'<div class="item" data-value="'+row.Description+'">'+row.Description+'</div>' 
            })

            dropdownFormEdit('refresh', data)

            window.data.grid = $("#jsGrid").jsGrid({
               
                width: "90%",
                height: "auto",

                viewrecords : true,
                gridview : true,

                autoload: true,
                paging: true,
                pageLoading: true,

                filtering: true,
                inserting: false,
                editing: false,
                selecting: true,
                sorting: true,

                pageSize: 10,
                pageIndex:1,
                onRefreshed: function(grid) {
                        $('.sale.icon').parent().parent().css({color:'red'})
                },                     // handles the finish of loading data by controller.loadData
                rowClick: function(args) {
                    editForm('formEdit','edit',args)                
                },
                finishLoad: function(loadedData) {
                    window.data.pageData = loadedData
                },
                controller: {

                    loadData: function(filter) {

                        return $.ajax({
                            type: "GET",
                            url: "/api/books/page?type="+$('.ui.secondary.pointing.menu .item.active').attr('data') ,
                            data: filter
                        });
                       // var d = $.Deferred();
        
                      //  $.ajax({
                      //      url: "/api/books/page?page="+filter.pageIndex+"&elemsperpage="+filter.pageSize,
                       //     dataType: "json"
                      //  }).done(function(response) {
                      //      debugger
                      //      d.resolve(response);
                      //  });
        
                      //  return d.promise();
                    }
                },
        
                fields: [
                    { title: "id", name: "idbooks", type: "number", width: 25, visible:false },
                    { title: "img", type: "number", visible:true , width: 50,  filtering: false,
                        itemTemplate: function(val,item) {
                            var _src ='/api/books/img?ref='+item.vendorListingid
                            return $("<img>").attr("src", item.img).attr("data", item.vendorListingid)
                                             .css({ height: 40, width: 40 })
                                             .click(function(event){
                                                 event.stopPropagation()
                                                 imageForm(item,this)
                                                // alert('comming soon, pronto gestión de fotitos')
                                             })
                        }                    
                    },
                    { name: "vendorListingid", title:'ref' ,type: "text", width: 80, align: "center" },
                    //{ name: "Rating", type: "number", width: 50, align: "center",
                    //    itemTemplate: function(value) {
                    //        return $("<div>").addClass("rating").append(Array(value + 1).join("&#9733;"));
                    //    }
                    //},
                    { name: "title", type: "text", width: 300 ,
                        itemTemplate: function(value) {
                            var _f = $("#jsGrid").jsGrid("getFilter")
                            if(_f.title.length>0){
                                var exp = new RegExp(_f.title, 'gi')                            
                                _.each(value.match(exp,"gi"),function(_v){
                                    value = _.replace(value, _v, '<span class="red"><b>'+_v+'</b></span>');
                                })
                            }
                            return $("<div>").append(value);
                        }
                    },
                    
                    { name: "author", type: "text", width: 300,
                    itemTemplate: function(value) {
                        var _f = $("#jsGrid").jsGrid("getFilter")
                        if(_f.author.length>0){
                            var exp = new RegExp(_f.author, 'gi')                            
                            _.each(value.match(exp,"gi"),function(_v){
                                value = _.replace(value, _v, '<span class="red"><b>'+_v+'</b></span>');
                            })
                        }
                        return $("<div>").append(value);
                    }},
                    {  title: "loc", name: "_loc", type: "text", width: 40,
                    itemTemplate: function(value) {        
                        return value;
                    }},
                    {  title: "€", name: "price_quantity", type: "text", width: 40, align: "right", 
                    itemTemplate: function(value) {        
                        return value+" €";
                    }},
                    {  title: "sale", name: "_sale", type: "text", width: 40,
                    itemTemplate: function(value) {
                        var _t = value=='IBER'?'leanpub':'amazon'       
                        return value==null?null:$('<i class="'+_t+' icon sale">');
                    }},
                    {  title: "", name: "C_iberlibro", type: "text", width: 40,filtering: false,
                    itemTemplate: function(value,record) {
                        var _t = value>0?'green':'red'       
                        return value==null?null:$('<i class="leanpub '+_t+' icon large '+(record._sale!=null?'hidden':'')+'">').attr('data',record.vendorListingid).click(function(e){
                            e.stopPropagation()
                               
                               var _id = $(this).attr('data') 
                               form = 'formIberlibro'
                               editForm(form,'edit',{ item: gridTorecord( _id ) })
                               bookfinder(form,_id)

                        })
                    }},
                    {  title: "", name: "C_amazon", type: "text", width: 40,filtering: false,
                    itemTemplate: function(value,record) {
                        var _t = value>0?'green':'red'       
                        return value==null?null:$('<i class="amazon '+_t+' icon large '+(record._sale!=null?'hidden':'')+'">').attr('data',record.vendorListingid).click(function(e){
                            e.stopPropagation()
                            var _id = $(this).attr('data') 
                            form = 'formAmazon'
                            editForm( form ,'edit',{ item: gridTorecord( _id ) } )
                            bookfinder(form,_id)
                        });
                    }}
                ]
            });
    



    $('.ui.menu .item').on('click', function() {

        if($(this).hasClass('new')){
            editForm('formEdit','new',args)
        }else{
            if(!$(this).hasClass('flag')){
                $('.ui .item').removeClass('active');
                $(this).addClass('active'); 
                if($(this).attr('data')=='amazon'){
                    $('.right.menu .item.flag.es').addClass('active')
                    $('.right.menu .item.flag').removeClass('hidden')
                }else{
                    $('.right.menu .item.flag').addClass('hidden')
                }
                $("#jsGrid").jsGrid("loadData"); 
            }else{
                if(!$(this).hasClass('es'))
                    if($(this).hasClass('active')){
                        $(this).removeClass('active');
                    }else{
                        $(this).addClass('active');
                    }
            }        
        }
     }); 

    });
});