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
