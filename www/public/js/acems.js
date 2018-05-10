$(document).ready(function() {
    $('.full').height()
    $('.context.acems .ui.sidebar')
    .sidebar({
      context: $('.context.acems .bottom.segment')
    })
    .sidebar('attach events', '.context.acems .menu .item')
  ;
})