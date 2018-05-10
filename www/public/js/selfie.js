$(document).ready(function() {
    $('.destino').hide()
    
    function mediaForm(_type,objdestino){
        $('.destino').hide()
        $.fn.webCamera(_type,function(_type,imgData,superbuffer,blobbuff){
            $('#images').modal('hide')
            if(_type=='photo')
                $(objdestino).attr("src",imgData).removeAttr('style').show()
            if(_type=='video')
                //$(objdestino).attr("src",imgData).removeAttr('style').show()

            $.ajax({
                type: "GET",
                url: imgData 
            }).done(function( data ) {
                debugger
                alert('foto guardada')
                  
            });



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