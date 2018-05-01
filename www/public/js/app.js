$(document).ready(function() {
    $('.ui.menu .item').on('click', function() {
        $('.ui .item').removeClass('active');
        $(this).addClass('active');
     }); 
});