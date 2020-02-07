$(document).ready(function() {
  var fixed_header = new DetectiveScroll({
    trigger: {
      el: $('.fixed_header'),
      scroll: $('.main-header').outerHeight()
    }
  })
});
