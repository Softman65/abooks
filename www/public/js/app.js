$(document).ready(function() {

    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};
    
        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });
    
        return indexed_array;
    }
    function diferences(modificado,original){
        var _ret = {}
        _.each(modificado, function(value,key){
            if(value!=original[key] && (value.length>0 && original[key]!=null) )
                _ret[key]=value
        })
        return _ret!={}?_ret:null
    }
    var clients = [
        { "Name": "Otto Clay", "Age": 25, "Country": 1, "Address": "Ap #897-1459 Quam Avenue", "Married": false },
        { "Name": "Connor Johnston", "Age": 45, "Country": 2, "Address": "Ap #370-4647 Dis Av.", "Married": true },
        { "Name": "Lacey Hess", "Age": 29, "Country": 3, "Address": "Ap #365-8835 Integer St.", "Married": false },
        { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave", "Married": true },
        { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false }
    ];
 
    var countries = [
        { Name: "", Id: 0 },
        { Name: "United States", Id: 1 },
        { Name: "Canada", Id: 2 },
        { Name: "United Kingdom", Id: 3 }
    ];
   // $.ajax({
   //     url: "/api/books/total?elems=50",
   //     dataType: "json"
   // }).done(function(response) {
   //     debugger
        
    
            $("#jsGrid").jsGrid({
               
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

                pageSize: 18,
                pageIndex:1,
                onRefreshed: function(grid) {
                        $('.sale.icon').parent().parent().css({color:'red'})
                },                     // handles the finish of loading data by controller.loadData
                rowClick: function(args) {
                    console.log(args)
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
                                $('#edit input[name="'+value+'"]').val(getData[value])
                            }
                        }
                      //text.push(value + " : " + getData[value])
                    });
                    $('#edit .ui.approve.button').html('Modificar')
                    $('#edit .header.book').html('<span><span class="left green">'+getData.title+'</span><span class="right">'+getData.vendorListingid+'-<span class="red">'+(getData._loc==null?'?':getData._loc)+'</span></span></span>')
                    $('#edit').modal({
                      onDeny    : function(){
                        return true;
                      },
                      onApprove : function() {
                        var $form = $("form.editForm")
                        var _JsonArgs = diferences(getFormData($form),args.item)
                        
                        if(_JsonArgs!=null)  
                            $.ajax({
                                type: "POST",
                                url: "/api/books/update?id="+args.item.idbooks,
                                data: _JsonArgs
                            }).done(function( data ) {
                                data.body.idbooks = args.item.idbooks
                                $("#jsGrid").jsGrid( "updateItem" ,data.body ); 
                                $("#jsGrid").jsGrid( "refresh" );   
                            });
                        
                      }}).modal('show')
                    
                    //$("#label").text(text.join(", "))                    
                },
                controller: {

                    loadData: function(filter) {

                        return $.ajax({
                            type: "GET",
                            url: "/api/books/page",
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
                    { name: "vendorListingid", title:'ref' ,type: "text", width: 80, align: "center", filtering:false },
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
                    }}
                ]
            });
    //});



    $('.ui.menu .item').on('click', function() {
        $('.ui .item').removeClass('active');
        $(this).addClass('active');
     }); 
});