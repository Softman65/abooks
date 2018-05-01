$(document).ready(function() {
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
                height: "300",

                viewrecords : true,
                gridview : true,

                autoload: true,
                paging: true,
                pageLoading: true,

                filtering: false,
                inserting: false,
                editing: false,
                selecting: true,
                sorting: true,

                pageSize: 20,
                pageIndex:1,

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
                    { name: "vendorListingid", title:'ref' ,type: "text", width: 80, align: "center" },
                    //{ name: "Rating", type: "number", width: 50, align: "center",
                    //    itemTemplate: function(value) {
                    //        return $("<div>").addClass("rating").append(Array(value + 1).join("&#9733;"));
                    //    }
                    //},
                    { name: "title", type: "text", width: 300},
                    { name: "author", type: "text", width: 300}
                ]
            });
    //});



    $('.ui.menu .item').on('click', function() {
        $('.ui .item').removeClass('active');
        $(this).addClass('active');
     }); 
});