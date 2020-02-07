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
