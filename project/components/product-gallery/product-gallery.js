var mzOptions = {
  zoomDistance: 0,
  expand: 'window',
  rightClick: 'true',
  hint: 'off'
};
$(document).ready(function() {
  var $galleryThumbs = '.gallery-wrapper .js-gallery-thumbs';
  var $galleryMain = '.gallery-wrapper .js-product-gallery-main';
  galleryInit($galleryThumbs, $galleryMain);
});

function galleryInit(galleryThumbs, galleryMain) {
  var $galleryThumbs = $(galleryThumbs);
  var $galleryMain = $(galleryMain);

  var galleryThumbsSlider = new Swiper(galleryThumbs, {
    loopedSlides: $(galleryThumbs + ' .swiper-wrapper .swiper-slide').length,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next.is-thumb',
      prevEl: '.swiper-button-prev.is-thumb',
    },
    speed: 200,
    loop: false,
    slidesPerView: 3,
    touchRatio: 0.2,
    slideToClickedSlide: true
  });

  var galleryTop = new Swiper(galleryMain, {
    loopedSlides: $(galleryMain+' .swiper-wrapper .swiper-slide').length,
    navigation: {
      nextEl: '.swiper-button-next.is-gallery',
      prevEl: '.swiper-button-prev.is-gallery',
    },
    speed: 200,
    loop: false,
    spaceBetween: 0
  });

  galleryTop.on('transitionEnd', function (e) {
    $('.js-gallery-trigger').removeClass('is-active');
    $('.js-gallery-trigger').eq(galleryTop.activeIndex).addClass('is-active');
    if($galleryThumbs[0] && $galleryThumbs[0].swiper) $galleryThumbs[0].swiper.slideTo(galleryTop.activeIndex);
  })

  galleryTop.params.control = galleryThumbsSlider;
  galleryThumbsSlider.params.control = galleryTop;

  $galleryThumbs.find('.js-gallery-trigger:first').addClass('is-active');
  $(document).on('click', galleryThumbs + ' .js-gallery-trigger', function(event) {
    event.preventDefault();
    var index = $(this).index();
    if ($galleryMain[0] && $galleryMain[0].swiper) {
      $galleryMain[0].swiper.slideTo(index);
    }
  });
}
