$(document).ready(function() {
  var hitsSlider = InitSwiper($('.js-hits .js-products-slider'), {
    autoLength: true,
    loop: false,
    minCartWidth: 270,
    spaceBetween: 30,
    autoResponsive: false
  });

  $('.js-hits').dataTabs({
    onInit: function () {
      setTimeout(function () {
        $.each(hitsSlider, function(index, el) {
          el.update();
        });
      }, 100)
    },
    onTab: function () {
      $.each(hitsSlider, function(index, el) {
        el.update();
      });
    }
  });
});
