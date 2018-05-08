$(document).ready(function() {
    $('.destino').hide()
    
    function imageForm(objdestino){
        $.fn.webCamera('photo',function(imgData){
            $('#images').modal('hide')
            $(objdestino).attr("src",imgData).removeClass('hidden')

           // $.ajax({
           //     type: "POST",
           //     url: "/api/books/imageSave?vendorListingid="+$(objdestino).attr("data") ,
           //     data: { image : imgData}
           // }).done(function( data ) {
           //     
           //     alert('foto guardada')
           //       
           // });



        })

        $('#images').modal({
            onApprove : function() {
                debugger
            } 
        }).modal('show')
    }



    $('.ui.button').click(function(){
        if($(this).hasClass('photo')){
            $('#images').modal({
                onApprove : function() {
                    debugger
                } 
            }).modal('show')
        
            imageForm($('.destino.photo')[0])
        }

    })




})