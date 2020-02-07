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
