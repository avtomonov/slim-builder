$(document).ready(function() {
  var scroll_top = new DetectiveScroll({
    trigger: {
      el: $('.js-scroll_top'),
      scroll: $(window).height() / 3
    }
  })

  $(document).on('click', '.js-scroll_top', function(event) {
    event.preventDefault();
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  });
});
