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
