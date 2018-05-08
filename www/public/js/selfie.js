$(document).ready(function() {
    $('.destino').hide()
    
    function mediaForm(_type,objdestino){
        $('.destino').hide()
        $.fn.webCamera(_type,function(imgData){
            $('#images').modal('hide')
            $(objdestino).attr("src",imgData).removeAttr('style').show()

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
        
            mediaForm('photo',$('.destino.photo')[0])
        }
        if($(this).hasClass('video')){
            $('#images').modal({
                onApprove : function() {
                    debugger
                } 
            }).modal('show')
        
            mediaForm('video')
        }

    })




})