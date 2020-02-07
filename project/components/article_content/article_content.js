$(document).ready(function() {
  $(document).on('click', '.article-text img', function(event) {
    BigPicture({
      el: event.target
    });
  });
});
