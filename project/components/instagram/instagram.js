$(document).ready(function() {
  if ($('.js-instagram').length) {
    // Получаем фотографии из API
    var myInstagram = new InstagramPhotos({
      user_id: 5720831737,
      access_token: '5720831737.1677ed0.75c5924295bb49eaa35c62372aabfd64',
      countPhoto: 20,
      // filterImages: function (image){
      //   return image.likes.count > 0
      // },
      done: function (photos) {
        console.log(photos);
        $(".js-instagram .swiper-container").html(
          templateLodashRender({ photos: photos }, "insta-footer")
        );

        setTimeout(function () {
          instaSlider()
        }, 100)
      },
      fail: function (error) {
        if (error.meta) {
          console.warn(error.meta.error_message);
        }
      }
    });
  }


  function instaSlider() {
    var instagramSlider = InitSwiper('.js-instagram', {
      autoLength: true,
      minCartWidth: 300,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      speed: 600,
      setWrapperSize: true,
      paginationClickable: true,
      loop: true,
      preventClicks: true,
      controlBy: 'container',
      spaceBetween: 0
    });
  }

});
