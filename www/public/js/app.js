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
    function editForm(_type,args){


        $('#edit').modal(
            {
                onVisible: function(){
                    setTimeout(function(){
                            if(_type=='edit'){
                                $('#edit [name="universalIdentifier_number"]').focus()
                            }else{
                                $('#id').focus()
                            }
                        },100)
                },
                onDeny    : function(){
                  return true;
                },
                onApprove : function() {
                  var $form = $("form.editForm")
                  var _JsonArgs={}
                  if(_type=='edit'){
                    _JsonArgs = diferences(getFormData($form),args.item)
                  }else{
                    _JsonArgs = getFormData($form)
                  }
                  debugger
    
                  if(_JsonArgs!=null){ 
                      $.ajax({
                          type: "POST",
                          url: "/api/books/" + _type +(_type=='edit'?"?id="+args.item.idbooks+'&vendorListingid='+args.item.vendorListingid:''),
                          data: _JsonArgs
                      }).done(function( data ) {
                          $("#jsGrid").jsGrid( "loadData" );   
                      });
                  }else{
                      alert('Sin cambios que guardar')
                  }
                }
        }).modal('show')

        debugger
        if(_type=='edit'){
            var getData = args.item;
            var keys = Object.keys(getData);
            var text = [];
        
            $.each(keys, function(idx, value) {
                if(value == 'description'){
                    $('#edit textarea[name="'+value+'"]').text(getData[value])
                }else{
                    if(value == '_sale'){
                        $('#edit .ui.toggle.checkbox').checkbox(getData[value]==null?'uncheck':getData[value].length>0?'check':'uncheck')
                    }else{
                        if($('#edit input[name="'+value+'"]').attr('type')!='hidden'){
                            $('#edit input[name="'+value+'"]').val(getData[value]).removeAttr("disabled")
                        }else{
                            $('#edit .'+value+' .text').removeClass('default').html(getData[value])
                            $('#edit .'+value+' [type="hidden"]').val(getData[value])
                        }
                    }
                }
              //text.push(value + " : " + getData[value])
            });
            $('#id').val(args.item.idbooks).parent().addClass('disabled')
            $('#edit .ui.approve.button').html('Guardar')
            $('#edit .header.book').html('<span><span class="left green">'+getData.title+'</span><span class="right">'+getData.vendorListingid+'-<span class="red">'+(getData._loc==null?'?':getData._loc)+'</span></span></span>')
           
        }else{

            $('#edit input').each(function(obj){
                var q = $('#edit input')[obj]
                $(q).val('')
                if(q.hasAttribute("disabled")){
                    $(q).removeAttr("disabled")
                }else{
                    $(q).attr("disabled","")
                }
            })
            $('#edit textarea').attr("disabled","").text('')
            $('#id').removeAttr("disabled").keyup(function( event ) {
                if ( event.which == 13 ) {
                  event.preventDefault();
                  $.ajax({
                    type: "POST",
                    url: "/api/books/key?value=" + $('#id').val()
                  }).done(function(data){
    
                    if(!data.ok){
                        if(data.error){
                            alert('problemas con el formato, causan errores\nreferencia no valida')
                        }else{
                            alert('referencia ya existente, prueba con otra')
                        }
                    }else{
                        $('#edit input').each(function(obj){
                            var q = $('#edit input')[obj]
                            if(q.hasAttribute("disabled")){
                                $(q).removeAttr("disabled")
                            }else{
                                $(q).attr("disabled","")
                            }
                        })                        
                    }
                
                  });
                }
            }).parent().removeClass('disabled');

            $('#edit .header.book').html('Nuevo Libro')
            $('#edit .ui.approve.button').addClass("disabled").html('Crear')
        }


        
        $(' input.numeric').keydown(function(event){
            return ( (event.which >48 &&  event.which <63) || event.which ==13 || event.which==46 || event.which==8) 
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
        debugger
    }
    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};
        debugger

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

    $.ajax({
        url: "/api/books/tables",
        dataType: "json"
    }).done(function(tables) {
            //debugger

            var data = {}
            _.each(tables[1],function(row){
                if(data[row.name]==null)
                data[row.name]=''
                data[row.name] = data[row.name] +'<div class="item" data-value="'+row.Description+'">'+row.Description+'</div>' 
            })
            $('#edit .ui.dropdown.productType .menu').html(data.productType) 
            $('#edit .ui.dropdown.productType').dropdown('refresh')

            $('#edit .ui.dropdown.bookCondition .menu').html(data.bookCondition)
            $('#edit .ui.dropdown.bookCondition').dropdown('refresh')

            $('#edit .ui.dropdown.jacketCondition .menu').html(data.jacketCondition)
            $('#edit .ui.dropdown.jacketCondition').dropdown('refresh')

            $('#edit .ui.dropdown.inscriptionType .menu').html(data.inscriptionType)
            $('#edit .ui.dropdown.inscriptionType').dropdown('refresh')

            $('#edit .ui.dropdown.bindingText .menu').html(data.binding)
            $('#edit .ui.dropdown.bindingText').dropdown('refresh')

            $('#edit .ui.dropdown.edition .menu').html(data.edition)
            $('#edit .ui.dropdown.edition').dropdown('refresh')

          

    
            var grid = $("#jsGrid").jsGrid({
               
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
                    editForm('edit',args)                
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
                    {  title: "IBER", name: "C_iberlibro", type: "text", width: 40,filtering: false,
                    itemTemplate: function(value,record) {
                        var _t = value>0?'green':'red'       
                        return value==null?null:$('<i class="leanpub '+_t+' icon '+(record._sale!=null?'hidden':'')+'">').click(function(e){
                            e.stopPropagation()
                        })
                    }},
                    {  title: "AMAZON", name: "C_amazon", type: "text", width: 40,filtering: false,
                    itemTemplate: function(value,record) {
                        var _t = value>0?'green':'red'       
                        return value==null?null:$('<i class="amazon '+_t+' icon '+(record._sale!=null?'hidden':'')+'">').click(function(e){
                            e.stopPropagation()
                        });
                    }}
                ]
            });
    



    $('.ui.menu .item').on('click', function() {

        if($(this).hasClass('new')){
            editForm('new',args)
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