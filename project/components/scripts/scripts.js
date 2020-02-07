$(document).ready(function() {
  $('body').addClass('dom-ready');

  $(window).on('load', function(event) {
    $('body').addClass('window-load');
  });

  var elements = $('.sticky');
  Stickyfill.add(elements);
});
