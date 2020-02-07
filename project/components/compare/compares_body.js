$(function () {

  var $compareCount = $('.js-compare-amount');
  var $compareTable = $('.js-compare-table');

  var compareWrapper = '#js-compare-wrapper';
  var compareInner = '#js-compare-inner';
  var compareUrl = document.location.href;

  EventBus.subscribe('before:insales:compares', function () {
    if (Site.template == 'compare') {
      $('<div class="preloader is-white is-32"></div>').prependTo($(compareWrapper)).fadeIn('fast');
    }
  });

  EventBus.subscribe('init:insales:compares', function (data) {
    for (i = 0; i < data.products.length; i++) {
      $('[data-compare="' + data.products[i].id + '"] .compare-add').addClass('active');
      $('[data-comp-id="' + data.products[i].id + '"]').removeClass('hide');
    }
    $compareCount.html(data.products.length);
  });



  EventBus.subscribe('remove_item:insales:compares', function (data) {

    if (Site.template == 'compare') {
      $('[data-compared-id=' + data.action.item + ']').fadeOut(300, function () {
        $(this).remove();
      });
    }

  });

  EventBus.subscribe('update_items:insales:compares', function (data) {

    for (i = 0; i < data.products.length; i++) {
      $('[data-comp-id="' + data.products[i].id + '"]').removeClass('hide');
    }

    if (data.products.length == 0) {
      $('.compare-toolbar').fadeOut('slow');
      $('.table-compare').fadeOut('slow').html('<div class="notice notice-info text-center">Список сравнения пуст</div>').fadeIn('slow');
    } else {
      $(compareWrapper).load(compareWrapper + ' ' + compareInner, function () {
        if (!$.cookie('compare-view') && $('.product-title').length > 1) {
          $(sameRows).hide();
          $(compareViewToggler).addClass('active');
        }
      });
    }


    $('.preloader').fadeOut('fast', function () {
      $(this).remove();
    });

  });

  /**
   * COMPARE VIEW
   * Настройка переключалки видимости блоков
   * @type {string}
   */
  var compareViewToggler = '.js-same-toggle';
  var sameRows = '.same-row';

  if (!$.cookie('compare-view') && $('.product-title').length > 1) {
    $(sameRows).hide();
    $(compareViewToggler).addClass('active');
  }

  $(document).on('click', compareViewToggler, function (e) {
    e.preventDefault();

    $(compareViewToggler).toggleClass('active');
    $(sameRows).toggle();

    if (!$(this).hasClass('active')) {
      $.cookie("compare-view", 'true');
    } else {
      $.removeCookie("compare-view");
    }

  });

});
