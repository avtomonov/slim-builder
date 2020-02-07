$(document).ready(function() {
  $(document).on('click', '[data-open-mobile]', function(event) {
    event.preventDefault();
    var target = '[data-target-mobile-menu="'+$(this).data('open-mobile')+'"]'
    alertify.panel({
      target: target,
      position: 'left',
      onOpen: function () {
        $('body').addClass('open-collection-filter');
        $('body').addClass('open-mobile-menu');
        $('.mobile_menu-item[data-tabs-container]').dataTabs({
		  state: 'accordion',
          initOpenTab: false,
          onInit: function(ins){
            ins.closeAllTabs();
          }
		});
      },
      onclose: function () {
        $('body').removeClass('open-collection-filter');
        $('body').removeClass('open-mobile-menu');
      }
    });
  });

});
