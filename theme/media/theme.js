
/**
 * ARTICLE_CONTENT
 */
$(document).ready(function() {
  $(document).on('click', '.article-text img', function(event) {
    BigPicture({
      el: event.target
    });
  });
});


/**
 * CART
 */
$(document).ready(function() {
  var mainCart = new CartMan({
    declination: ['товар', 'товара', 'товаров'],
    hideCartItems: true, // Скрывать поля корзины при удалении? [data-item-id]
    counterTemplate: '(%c%)', // regexp %c% (%c% - counter)
    counterTemplateEmpty: null, // regexp %c% (Шаблон для пустой корзины)
    positionsTemplate: '(%c%)', // regexp %c% (%c% - counter)
    positionsTemplateEmpty: null, // regexp %c% (Шаблон для пустой корзины)
    counterItemsText: 'В вашей корзине %c%&nbsp;%w%', // regexp %c%,%w% (%c% - counter, %w% - word)
    counterItemsTextEmpty: 'В вашей корзине %c%&nbsp;%w%', // regexp %c%,%w% (%c% - counter, %w% - word)
    counterPositionText: 'В вашей корзине %c%&nbsp;%w%', // regexp %c%,%w% (%c% - counter, %w% - word)
    counterPositionTextEmpty: 'В вашей корзине %c%&nbsp;%w%', // regexp %c%,%w% (%c% - counter, %w% - word)
    updateItems: function (cart) {
      if (cart.order_lines.length == 0) {
        $('[data-cart-quick]').hide();
        $('.cart_sidebar').hide();
        $('.cart-item').hide();
        $('.cart-empty').removeClass('hide');
      }
    }
  });
});

/**
 * CATEGORY
 */
$(document).ready(function() {
  $('.category_menu-item[data-tabs-container]').dataTabs({
    state: 'accordion',
    useJqMethods: false
  });
});

/**
 * COLLECTION_FILTERS
 */
$(document).ready(function() {
  initCollectionFilter();

  $(document).on('click', '[data-open-filter]', function(event) {
    event.preventDefault();
    alertify.panel({
      target: '.collection-filter',
      position: 'left',
      onOpen: function () {
        initCollectionFilter();
        $('body').addClass('open-collection-filter');
      },
      onclose: function () {
        $('body').removeClass('open-collection-filter');
      }
    });
  });
});

function initCollectionFilter() {
  $('.js-filter-section').dataTabs({
    state: 'accordion',
    useJqMethods: false
  });
  $('.js-filter-range-slider').rangeSlider({
    force_edges: true
  });
  $('.js-filter-range-slider-price').rangeSlider({
    force_edges: true
  });
}

$(function () {
  $('.js-filter-trigger').on('change', function (event) {
    $(this).parents('form:first')
    .submit();
  });
  $(document)
    .on('click', 'label', function (event) {
      var $form = $(this).parents('form:first');
      var $filterItem = $(this).parents('.filter-item');
      var $checkbox = $filterItem.find(':checkbox');

      if ($form.hasClass('collection-filter')) {
        event.preventDefault();
        $checkbox
          .prop('checked', !$checkbox.prop('checked'))
          .trigger('change');
      }
    })
    .on('change', 'input:not(.js-filter-range-placeholder), select', function (event) {
      var $form = $(this).parents('form:first');

      sendFilter($form, $(this));
    })
    .on('click', '[type="submit"]', function (event) {
      var $form = $(this).parents('form:first');

      if ($form.hasClass('collection-filter')) {
        event.preventDefault();
        sendFilter($form, $(event.target));
      }
    })
    .on('check', '.collection-filter', function (event) {

      sendFilter($(this), $(this));
    });

  function sendFilter ($form, $source) {
    if (!$form.hasClass('collection-filter')) {
      return false;
    }

    var isSubmitOnChange = $form.data('submit-onchange');
    var isButton = $source.is('button');

    if (isSubmitOnChange || isButton) {
      $form.submit();
    }
  };
});

/**
 * COLLECTIONINFINITY
 */
$(document).ready(function() {
  /**
  * data-collection-infinity="{{ paginate.next.url }}"
  * атрибут стоит на родителе карточек коллекции
  */

  if ($('[data-collection-infinity]').length) {
    var html = document.documentElement;
    $(window).on('scroll', function(event) {
      var scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
      scrollTop -= html.clientTop;
      var part = 1.7; // на это число разделиться высота контейнера с товарами

      var collscroll = $('[data-collection-infinity]').get(0).offsetTop + ($('[data-collection-infinity]').get(0).offsetHeight / part);

      if (scrollTop > collscroll) {
        collectionInfinity();
      }
    });
  }

  // массив tempPage хранит метки страниц которые уже загрузили
  var tempPage = [];
  function collectionInfinity() {
    var _nextPage = $('[data-collection-infinity]').data('collection-infinity');
    if (_nextPage && _nextPage != '') {
      if (tempPage.indexOf(_nextPage) > -1) {
        return;
      }
      tempPage.push(_nextPage);
      $('body').addClass('body--loading');

      // грузим контент
      $.ajax({
        url: _nextPage,
        dataType: 'html'
      })
      .done(function(_dom) {
        var $dom = $(_dom);
        var $next = $dom.find('[data-collection-infinity]');
        var _next = $next.data('collection-infinity');
        $('[data-collection-infinity]').append( $next.html() );
        $('[data-collection-infinity]').data('collection-infinity', _next).attr('data-collection-infinity', _next);

        $('[data-product-id]').each(function(index, el) {
           Products.initInstance($(el));
        });
      })
      .always(function () {
        $('body').removeClass('body--loading');
      })
    }
  }
});

/**
 * COMPARE_PRODUCT
 */
$(document).ready(function() {
  var _CompareProducts = new CompareProducts({
    counterTemplate: '(%c%)', // regexp %c%
    counterTemplateEmpty: null, // regexp %c%
    buttonNotAddedText: null, // текст не активной кнопки
    buttonAddedText: null, // текст активной кнопки
    titles: {
      added: 'Добавлен в сравнение',
      notAdded: 'В сравнение'
    },
    onAdd: function (data) {
      alertify.success('Товар добавлен в сравнение');
    },
    onRemove: function (data) {
      alertify.message('Товар удален из сравнения');
    },
    onUpdate: function (data) {
      // обновление
    },
    onInit: function (data) {
      // инициализация
    },
    onOverload: function (data) {
      alertify.warning('Достигнуто максимальное количество сравниваемых товаров - ' + data.maxItems);
    }
  });
});

/**
 * COMPARES_BODY
 */
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


/**
 * DECLINATION
 */
/**
 * Склонение слов
 * @param  {number} _day  число
 * @param  {array} titles массив слов
 * @return {string}       склонение
 *
 * declinationText(2, ['человек', 'человека', 'человек'])
 * => 'человека'
 */
var declinationText = function(_day, titles) {
  var day = Math.round(_day);
  var _titles = ['товар', 'товара', 'товаров'];
  if (titles) {
    _titles = titles;
  }
  var cases = [2, 0, 1, 1, 1, 2];
  return _titles[ (day % 100 > 4 && day % 100 < 20) ? 2 : cases[(day % 10 < 5) ? day % 10 : 5]];
};


/**
 * DYNAMIC_BASKET
 */
$(document).ready(function() {
  EventBus.subscribe("update_items:insales:cart", function(cart) {
    $(".js-dynamic_basket").html(templateLodashRender(cart, "dynamic_basket"));
    // инициализация items
    InSalesUI.initAjaxInstance($(".js-dynamic_basket"));
  });
});

/**
 * FAVORITE
 */
var Favorite = {};
$(document).ready(function() {
  window.Favorite = new Favorites({
    counterTemplate: '%c%',
    //buttonNotAddedText: 'Добавить в избранное',
    //buttonAddedText: 'Удалить из избранного',
    onAdd: function () {
      alertify.success('Товар добавлен в избранное');
    },
    onRemove: function () {
      alertify.error('Товар удален из избранного');
    },
    onUpdate: function (data) {
      var isFavoritePage = $('.js-favorite').length > 0;
      if (isFavoritePage) {

        // Рендер списка
        $('.js-favorite').html(Template.render(data, 'favorite'));

        // инициализация инстансов нужна после динамического добавления товаров
        Products.getList(_.map(data.products, 'id'))
        Favorite.checkFavoritesProducts();
      }

    }
  });
});

/**
 * FIXED_HEADER
 */
$(document).ready(function() {
  var fixed_header = new DetectiveScroll({
    trigger: {
      el: $('.fixed_header'),
      scroll: $('.main-header').outerHeight()
    }
  })
});

/**
 * GEO_MANAGER
 */
$(document).ready(function() {
  var myGeo = new GeoManager({
   succes: function (geoData) {
     console.log(geoData);
     $('.js-city-name').html(geoData.city);
   }
  });

  $(document).on('submit', '.js-city-form', function(event) {
    event.preventDefault();
    var newCity = $(this).find('[name="city"]').val();
    if (newCity && newCity != '') {
      myGeo.setLocalData({city: newCity}, function () {
        console.log('Данные обновлены');
      })
    }
  });
});


/**
 * HITS
 */
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

/**
 * INSTAGRAM
 */
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

/**
 * MOBILE_MENU
 */
$(document).ready(function() {
  $(document).on('click', '[data-open-mobile]', function(event) {
    event.preventDefault();
    var target = '[data-target-mobile-menu="'+$(this).data('open-mobile')+'"]'
    alertify.panel({
      target: target,
      position: 'left',
      onOpen: function () {
        $('body').addClass('open-collection-filter');
        $('body').addClass('open-mobile-menu');
        $('.mobile_menu-item[data-tabs-container]').dataTabs({
		  state: 'accordion',
          initOpenTab: false,
          onInit: function(ins){
            ins.closeAllTabs();
          }
		});
      },
      onclose: function () {
        $('body').removeClass('open-collection-filter');
        $('body').removeClass('open-mobile-menu');
      }
    });
  });

});

/**
 * MODALS
 */
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



/**
 * PRODUCT_INFO
 */
$(document).ready(function() {
  Products.setConfig({
    initOption: true,
    filtered: false,
    showVariants: true,
    useMax: false,
    decimal: {
      kgm: 1,
      dmt: 1
    },
    fileUrl: (typeof fileUrl == 'undefined') ? {} : fileUrl,
    options: {
      //'Цвет': 'option-image',
      'default': 'option-select'
    }
  });

  window.myVariants = new VariantsModifier({
    updateVariant: function (data, $form) {
      //console.log(data);
    },
    selectors: {
      oldPrice: '[data-product-old-price]',
      price: '[data-product-price]',
      sku: '[data-product-sku]',
      quantity: '[data-quantity-message]',
      available: '[data-product-available]'
    },
    templates: {
      price: '%s%',
      oldPrice: '%s%',
      emptyOldPrice: '',
      sku: 'арт. %s%',
      emptySku: '',
      available: 'Есть в наличии',
      notAvailable: 'Нет в наличии',
      quantityEnds: 'Заканчивается',
      quantityAlot: 'Много',
      quantityNotAvailable: 'Нет в наличии'
    },
    productGallery: null, // Слайдер с изображениями товара
    quantityEnds: 10, // граница между заканчивается и много
    initVariantImage: false, // Выбор слайда при инициализации?
    updateVariantFromSlider: false, // Обновлять вариант при перелистывании слайдов
    useToggleOldPrice: true, // использовать show/hide на old price?
    useToggleSku: true, // использовать show/hide на sku?
    checkQuantityVariant: true, // проверять остаток варианта? Иначе продукта.
    quantityNull: 'quantityAlot' // Если кол-во не заполнено quantityEnds/quantityAlot/quantityNotAvailable
  });

});

/**
 * PRODUCT_TABS
 */
$(document).ready(function() {
  $('.js-tabs').dataTabs({
    state: 'tab', // роль плагина tab/accordion
    event: 'click',
    activeIndex: 1, // активный элемент
    speedSwitching: 5000, // скорость авто переключения
    useToggle: false, // Скрытие активных вкладок
    autoSwitching: false, // авто переключение
    hideOnClosest: false, // hide on closest
    hideOnMouseout: false, // hide on Mouseout
    prevent: true, // preventDefault
    debug: false, // дебагер
    useHash: true, // использовать window.location.hash
    useJqMethods: true, // использовать jq методы анимаций?
    loop: false, // замкнуть цикл при переключении?
    initOpenTab: true, // инициализировать активный таб?
    pauseVideoAudio: true, // ставить на паузу аудио и видео при переключении табов?
    mouseoutTimeOut: false, // таймаут после снятия курсора
    jqMethodOpenSpeed: 300, // скорость открытия табы
    jqMethodOpen: 'fadeIn', // jq метод открытия табы
    jqMethodCloseSpeed: 0, // скорость закрытия табы
    jqMethodClose: 'hide', // jq метод закрытия табы
    onInit: function () {}, // плагин инициализировался (onInit)
    onTab: function () {}, // переключили таб (self)
    onMouseover: function () {}, // навели на блок табов (event, self)
    onMouseout: function () {}, // убрали курсор с блока табов (event, self)
  });
});

/**
 * PRODUCT-GALLERY
 */
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

/**
 * PRODUCTS_SLIDER
 */
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

/**
 * PROMO
 */
$(document).ready(function() {
  var sliders = InitSwiper($('.promo-slider'))
});


/**
 * QUICK_VIEW
 */
$(document).ready(function() {
  $(document).on('click', '[data-quick-view]', function (event) {
    event.preventDefault();
    var _id = $(this).data('quick-view');
    Products.get(_id)
    .done(function (product) {

      $('.js-quick_view').html( templateLodashRender(convertProperties(product), 'quick_view') )

      Products.initInstance($('.js-quick_view [data-product-id]'));
      Favorite.checkFavoritesProducts();
      var $galleryThumbs = '.quick_view .js-gallery-thumbs';
      var $galleryMain = '.quick_view .js-product-gallery-main';

      MagicZoom.refresh()

      $.fancybox.open({
        src  : '#quick-view', // Source of the content
        type : 'inline'
      });

      galleryInit($galleryThumbs, $galleryMain);

    })
  });
});

var convertProperties = function (_product) {
  _product.parameters = {};
  _product.sale = null;

  // Пермалинк параметра: массив характеристик
  $.each( _product.properties, function( index, property ){

    $.each( _product.characteristics, function( index, characteristic ){
      if (property.id === characteristic.property_id) {
        setParam(_product.parameters, property.permalink, property)
        setParam(_product.parameters[ property.permalink ], 'characteristics', [])

        var uniq = true;
        $.each(_product.parameters[ property.permalink ].characteristics, function (index, cha) {
          if (cha.id == characteristic.id) {
            uniq = false;
          }
        });
        if (uniq) {
          _product.parameters[ property.permalink ].characteristics.push(characteristic)
        }
      }
    });

  });

  // Скидка в процентах
  if (_product.variants) {
    $.each( _product.variants, function( index, variant ){
      if (variant.old_price) {
        var _merge = Math.round( ((parseInt(variant.old_price) - parseInt(variant.price)) / parseInt(variant.old_price) * 100), 0 )
        if (_merge < 100) {
          _product.sale = _merge;
        }
      }
    });
  }

  function setParam(obj, name, value) {
    (obj[ name ] || (obj[ name ] = value))
  }

  return _product;
}

/**
 * RECENTLYVIEW
 */
$(document).ready(function() {
  var $recently_view = $('.js-recently_view');
  if ($recently_view.length > 0) {
    var myRecentlyView = new RecentlyView({
      success: function (_products) {
        if (_.size(_products) > 0) {
          var _templateRecentlyView = _.template($('[data-template-id="recently_view"]').html())
          $recently_view.html(_templateRecentlyView({ products: _products }));

          InitSwiper('.js-recently-slider', {
            autoLength: true,
            minCartWidth: 300,
            //maxBreakpoint: 1920,
            autoResponsive: false
          });

          // Инициализация data-product-id
          Products.getList(_.map(_products, 'id'));
        }
      }
    });
  }
});


/**
 * SCRIPTS
 */
$(document).ready(function() {
  $('body').addClass('dom-ready');

  $(window).on('load', function(event) {
    $('body').addClass('window-load');
  });

  var elements = $('.sticky');
  Stickyfill.add(elements);
});

/**
 * SCROLL_TOP
 */
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




/**
 * HELP
 */
function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++)
  {
      var spcook =  cookies[i].split("=");
      deleteCookie(spcook[0]);
  }
  function deleteCookie(cookiename)
  {
      var d = new Date();
      d.setDate(d.getDate() - 1);
      var expires = ";expires="+d;
      var name=cookiename;
      //alert(name);
      var value="";
      document.cookie = name + "=" + value + expires + "; path=/acc/html";
  }
  window.location = ""; // TO REFRESH THE PAGE
}

$(document).ready(function() {
  $(document).on('click', '[data-clear-cookies]', function(event) {
    event.preventDefault();
    deleteAllCookies();

    alertify.success('Куки очищены', 4)
  });
  $(document).on('click', '[data-clear-localforage]', function(event) {
    event.preventDefault();
    localforage.clear();

    alertify.success('localforage очищен', 4);
    window.location = ""; // TO REFRESH THE PAGE
  });
  $(document).on('click', '[data-clear-cart]', function(event) {
    event.preventDefault();
    Cart.clear();

    setTimeout(function () {
      alertify.success('Корзина очищена', 4);
      window.location = ""; // TO REFRESH THE PAGE
    }, 3000)
  });
});

/**
 * STYLE_GUIDE
 */
$(document).ready(function() {
  $('.js-style_tabs').dataTabs({
    state: 'accordion'
  });
  $('[data-alert-success]').click(function(event) {
    alertify.success('Товар добавлен в корзину', 10)
  });
  $('[data-alert-error]').click(function(event) {
    alertify.error('Ошибка при отправке формы', 10)
  });
  $('[data-alert-warning]').click(function(event) {
    alertify.warning('Товар удален', 10)
  });
  $('[data-alert-message]').click(function(event) {
    alertify.message('Все поля обязательны для заполнения', 10)
  });

  $('.js-fav-style').click(function(event) {
    event.preventDefault();

    $(this).toggleClass('not-added is-added');
  });
});

/**
 * TEMPLATE
 */
/**
 * Получение шаблона Lodash на основе данных
 * @param  {all} content       Данные для шаблона
 * @param  {string} templateId id из аттрибута data-template-id
 * @return {html}
 */
function templateLodashRender(content, templateId) {
  var templateContent = $('[data-template-id="'+templateId+'"]').html();
  var renderContent = _.template(templateContent);

  return renderContent(content);
}

function getDiscount(price, old_price) {
  var sale = '';
  var _merge = Math.round( ((parseInt(old_price) - parseInt(price)) / parseInt(old_price) * 100), 0 )
  if (_merge < 100) {

    sale = '<div class="stiker stiker-sale">' +
           '<span>'+
            'скидка '+_merge+'%'+
            '</span>' +
            '</div>';
  }


  return sale;
};

function getStiker(name, characteristics) {
  var labels_list = "";
  _.forEach(characteristics, function(characteristic) {
    if (
      characteristic.permalink == name ||
      (characteristic.property
        ? characteristic.property.permalink == name
        : false)
    ) {
      labels_list += '<div class="stiker stiker-';
      labels_list += characteristic.permalink;
      labels_list += '"><span>';
      labels_list += characteristic.title;
      labels_list += "</span></div>";
    }
  });

  return labels_list;
};

