$(document).ready(function() {
    $('.context.acems .ui.sidebar')
    .sidebar({
      context: $('.context.acems .bottom.segment')
    })
    .sidebar('attach events', '.context.acems .menu .item')
  ;
})