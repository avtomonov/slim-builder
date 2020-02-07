# Instagram

[Сгенерировать токен](http://instagram.pixelunion.net/)


[Найти Instagram User ID](https://smashballoon.com/instagram-feed/find-instagram-user-id/)


В настройках обязательно нужно убрать галку с "Disable implicit OAuth:"

Как пользоваться плагином в компоненте:

```js
var myInstagram = new InstagramPhotos({
  user_id: 1111111,
  access_token: '111111.1677ed0.9844c23093e34ff290cd09d941e22535',
  countPhoto: 20,
  done: function (photos) {
    // тут рисуем вывод фотографий
  },
  fail: function (error) {
    if (error.meta) {
      console.warn(error.meta.error_message);
    }
  }
});
```

[Популярная библиотека для вывода фотографий как альтернатива InstagramPhotos](http://instafeedjs.com/)
