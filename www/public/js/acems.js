$(document).ready(function() {
    $('.ui.pointing.menu .item').click(function(){
        $('.ui.pointing.menu .item').removeClass('active')
        $(this).addClass('active')
        
        $('.context.acems .ui.sidebar')
        .sidebar({
          context: $('.context.acems .bottom.segment')
        })
        .sidebar('attach events', '.context.acems .menu .item')
    })
  
})