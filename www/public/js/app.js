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

    $("#jsGrid").jsGrid({
        height: "80%",
        width: "100%",
 
        autoload: true,
        paging: true,
        pageLoading: true,
        pageSize: 15,
 
        controller: {
            loadData: function(filter) {
                var d = $.Deferred();
 
                $.ajax({
                    url: "/api/books",
                    dataType: "json"
                }).done(function(response) {
                    debugger
                    d.resolve(response.value);
                });
 
                return d.promise();
            }
        },
 
        fields: [
            { name: "Name", type: "text" },
            { name: "Description", type: "textarea", width: 150 },
            { name: "Rating", type: "number", width: 50, align: "center",
                itemTemplate: function(value) {
                    return $("<div>").addClass("rating").append(Array(value + 1).join("&#9733;"));
                }
            },
            { name: "Price", type: "number", width: 50,
                itemTemplate: function(value) {
                    return value.toFixed(2) + "$"; }
            }
        ]
    });



    $('.ui.menu .item').on('click', function() {
        $('.ui .item').removeClass('active');
        $(this).addClass('active');
     }); 
});