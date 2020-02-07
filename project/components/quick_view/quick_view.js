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
