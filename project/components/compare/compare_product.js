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
