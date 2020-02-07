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
