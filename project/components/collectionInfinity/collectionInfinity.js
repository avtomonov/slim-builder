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
