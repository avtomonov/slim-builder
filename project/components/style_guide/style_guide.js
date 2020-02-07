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
