# InitSwiper

```js

/**
 * Инициализация слайдера
 * @param  {jquery object/string} $container $('.main-slider') селектор блока со слайдером. не swiper-container, а его родитель
 * @param  {object} options настройки для свайпера
 * @return {Array instance} Массив инстансов слайдера
*/

var sliders = InitSwiper($('.main-slider'), {
  autoLength: true, // автоматически выставить кол-во слайдов исходя из минимальной ширины карточки
  minCartWidth: 280, // Минимальная ширина карточки
  autoResponsive: false // Автоматически расчитать респонсив для слайдера
})

var mySliders = InitSwiper('.main-slider', {
  autoLength: true, // автоматически выставить кол-во слайдов исходя из минимальной ширины карточки
  minCartWidth: 280, // Минимальная ширина карточки
  autoResponsive: true // Автоматически расчитать респонсив для слайдера
});

```

```html
<div class="main-slider">
  <!-- Slider main container -->
  <div class="swiper-container">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar"></div>
  </div>
</div>
```
