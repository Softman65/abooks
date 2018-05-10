$(document).ready(function() {
    $('.ui.pointing.menu a.item').click(function(){
      
        $('.ui.pointing.menu .item').removeClass('active')
        $(this).addClass('active')
        
        if($(this).attr("data")=="inicio"){

        } 

        if($(this).attr("data")=="directorio"){
          $('.context.acems .ui.sidebar')
          .sidebar({
            context: $('.context.acems .bottom.segment')
          })
          .sidebar('attach events', '.context.acems .menu .item')          
        } 

        if($(this).attr("data")=="buscar"){
          
        } 
       
    })
  
})