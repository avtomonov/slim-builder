$(document).ready(function() {
  InitSwiper($('.js-products-slider').not('.products-is-hits'), {
    roundLengths: true,
    autoLength: true, // автоматически выставить кол-во слайдов исходя из минимальной ширины карточки
    minCartWidth: 280, // Минимальная ширина карточки
    autoResponsive: false // Автоматически расчитать респонсив для слайдера
  })
});

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};
