$(document).ready(function() {
  $.fancybox.defaults.animationEffect = "zoom-in-out";

  $(document).on('afterShow.fb', function( e, instance, slide ) {
    if(MagicZoom) {
      $('.mz-zoom-window').remove();
      MagicZoom.refresh();
    }
  });

  EventBus.subscribe('add_items:insales:cart', function (cart) {

    $.fancybox.open({
      src  : '#cart-add', // Source of the content
      type : 'inline'
    })

  });

  $(document).on('click', '.added-close', function(event) {
    event.preventDefault();
    $.fancybox.close();
  });


  $(document).on('click', '.js-modal', function(event) {
    event.preventDefault();

    $.fancybox.open({
      src  : $(this).attr('href'), // Source of the content
      type : 'inline'
    });

  });


  $(document).on('click', '[data-open-mobile-menu]', function(event) {
      event.preventDefault();
      alertify.panel({
        target: '.mobile_menu',
        position: 'left'
      });
    });

  $('[name="phone"]').inputmask("+7(999) 999 9999");

  $('.js-feedback').InSalesFeedback({
    require: ['phone'],
    useAgree: true,
    showMessageAgree: true,
    onError: function(data) {
      // Ошибка валидации
      console.log(data);
    },
    onSuccess: function(data) {
      // сообщение успешно отправлено
      setTimeout(function () {
        $.fancybox.close();
      }, 5000)
    },
    onFail: function(data) {
      // Ошибка при отправке сообщения
      console.log(data);
    }
  });

  // Фикс для заказа в один клик
  $(document).on('click', '[data-quick-checkout]', function(event) {
    $.fancybox.close();
  });
  
  $(document).on('click', '[data-cart-quick]', function(event) {
    event.preventDefault();
    Cart.quickCheckout.openModal($('#insales-quick-checkout-dialog'))
    
  });
  
  $(document).on('click', '.template-cart button.m-modal-button.m-modal-button--checkout.button--checkout', function(event) {
      event.preventDefault();
      event.stopPropagation();
    
    Cart.quickCheckout._send()
  });

});
